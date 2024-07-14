import Header from "../../components/Header";
import s from "./base-layout.module.css";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}
