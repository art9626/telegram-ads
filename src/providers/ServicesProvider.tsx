/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Services } from "../api/Services";

const ServicesContext = React.createContext<Services>(new Services());

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services] = React.useState(() => new Services());

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  return React.useContext(ServicesContext);
}
