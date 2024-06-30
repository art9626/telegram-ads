import React from "react";
import { Flex } from "@radix-ui/themes";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" minHeight="100vh" px="2" justify="between">
      <Header />
      <main>{children}</main>
      <Footer />
    </Flex>
  );
}
