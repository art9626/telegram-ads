import { useInitData } from "@tma.js/sdk-react";
import React from "react";
import { authUser } from "../api/fetch";
import { Spinner } from "@telegram-apps/telegram-ui";

const AuthContext = React.createContext<string | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initData = useInitData();
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(() => {
    const token = localStorage.getItem("token");
    return !token;
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (initData)
        authUser(initData).then((res) => {
          setToken(res);
          setLoading(false);
        });
      console.error("Init data is empty");
    } else {
      setLoading(false);
      setToken(token);
    }
  }, [initData]);

  if (loading) return <Spinner size="l" />;

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

export function useToken() {
  return React.useContext(AuthContext);
}
