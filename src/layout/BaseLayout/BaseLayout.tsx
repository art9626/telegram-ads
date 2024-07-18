import { Outlet } from "react-router-dom";
import useWS from "../../hooks/useWS.ts";
import Header from "../../components/Header/Header";
import s from "./base-layout.module.css";

export default function BaseLayout() {
  useWS();

  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}
