import "../styles/globals.scss";
import * as React from "react";

function MyApp({ Component, pageProps }) {
  console.warn = () => {};

  return <Component {...pageProps} />;
}

export default MyApp;
