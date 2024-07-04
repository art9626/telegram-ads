import React from "react";
import { Flex } from "@radix-ui/themes";
import Header from "../components/Header";
import { useViewport } from "@tma.js/sdk-react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewPort = useViewport();

  return (
    <Flex
      direction="column"
      px="2"
      height={
        viewPort ? `${viewPort.stableHeight}px` : "var(--tg-viewport-height)"
      }

      // style={{height: }}
    >
      {/* <Flex direction="column" px="2" height="var(--tg-viewport-height)"> */}
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
