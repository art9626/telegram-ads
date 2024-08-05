/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Services } from "../api/Services";

const ServicesContext = React.createContext<Services | null>(null);

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
  const services = React.useContext(ServicesContext);
  if (!services) throw new Error("Use services context within provider!");
  return services;
}
