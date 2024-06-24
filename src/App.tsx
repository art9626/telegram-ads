import { SDKProvider, useInitData } from "@tma.js/sdk-react";
import { useEffect, useMemo } from "react";

function App() {
  return (
    <SDKProvider acceptCustomStyles debug>
      <h1>Test</h1>
      <div>My application!</div>
      <InitDataPage />
    </SDKProvider>
  );
}

function InitDataPage() {
  const initData = useInitData();

  const authData = useMemo(() => {
    if (!initData) return;

    const { hash, queryId, user, authDate } = initData;
    return {
      query_id: queryId,
      user: {
        id: user?.id,
        first_name: user?.firstName,
        last_name: user?.lastName,
      },
      auth_date: new Date(authDate).getTime(),
      hash: hash,
    };
  }, [initData]);

  useEffect(() => {
    if (authData) {
      const auth = async () => {
        const res = await fetch("https://botsquad.win/app/api/v1/auth", {
          body: JSON.stringify(authData),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
      };

      auth();
    }
  }, [authData]);

  return <div></div>;
}

export default App;
