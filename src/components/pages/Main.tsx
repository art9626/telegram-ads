import {useInitData} from "@tma.js/sdk-react";
import {useEffect, useState} from "react";
import {GameUser, getUser} from "../../lib/fetch.ts";
import Footer from "../footer/Footer.tsx";
import {Link} from "react-router-dom";
import {TonConnectButton} from "@tonconnect/ui-react";

export default function Main() {
  const initData = useInitData();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<GameUser>();

  useEffect(() => {
    getUser(token, initData).then(res => setUser(res))
  }, []);

  return (
    <div>
      <TonConnectButton />
      <h3>Name: {user?.full_name}</h3>
      <h3>Balance: {(user?.game_data.balance || 0) / 10e9}</h3>
      <h3>Views: {user?.game_data.watched}</h3>
      <h1><Link to="/ads">Watch ad</Link></h1>
      <Footer/>
    </div>
  );
}
