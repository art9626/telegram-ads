import { useInitData } from "@tma.js/sdk-react";
import React from "react";
import { authUser } from "../api/fetch";
import { Spinner } from "@telegram-apps/telegram-ui";

export default function Auth({ children }: { children: React.ReactNode }) {
  const initData = useInitData();
  const [loading, setLoading] = React.useState(() => {
    const token = localStorage.getItem("token");
    return !token;
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (initData)
        authUser(initData).then(() => {
          setLoading(false);
        });
      console.error("Init data is empty");
    } else {
      setLoading(false);
    }
  }, [initData]);

  if (loading) return <Spinner size="l" />;

  return <>{children}</>;
}
