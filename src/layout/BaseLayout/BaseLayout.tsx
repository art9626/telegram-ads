import { Outlet } from "react-router-dom";
import useWS from "../../hooks/useWS.ts";
import Header from "../../components/Header/Header";
import { ToastContainer } from "react-toastify";
import s from "./base-layout.module.css";

export default function BaseLayout() {
  useWS();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        theme="dark"
      />
      <div className={s.root}>
        <Header />
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
