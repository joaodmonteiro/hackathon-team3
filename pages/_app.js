import "../styles/globals.scss";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  console.warn = () => {};

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
