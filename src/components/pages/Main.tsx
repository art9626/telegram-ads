import {useInitData} from "@tma.js/sdk-react";
import {useEffect, useState} from "react";
import {GameUser, getUser} from "../../lib/fetch.ts";

export default function Main() {
  const initData = useInitData();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<GameUser>();

  useEffect(() => {
    getUser(token, initData).then(res => setUser(res))
  }, []);

  return (
    <div><span>{user?.full_name}</span></div>
  );
}
