// In _document.js
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArfnT6ldB6HunVSN0_dmZHlaI4BFX5aUY&libraries=places"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
