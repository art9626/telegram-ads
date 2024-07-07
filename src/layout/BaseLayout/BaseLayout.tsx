import React from "react";
import Header from "../../components/Header";
import s from "./base-layout.module.css";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
}
