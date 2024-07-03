import React from "react";
import { Flex } from "@radix-ui/themes";
import Header from "../components/Header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" px="2" height="100dvh">
      <Header />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {children}
      </main>
    </Flex>
  );
}
