import { useRef, useState } from "react";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/router";
import calculateRoute from "../hooks/calculateRoute";
import styles from "../styles/Form1.module.scss";

export default function Form1({ data }) {
  // console.log(process.env.GUI);
  const originRef = useRef();
  const destinationRef = useRef();
  const router = useRouter();
  // loads your ApiKey into the googleMaps Api.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KAZ,
    libraries: ["places"],
  });
  const handleSubmit = async (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const results = await calculateRoute(originRef, destinationRef);
    router.push(`/${originRef.current.value}&${destinationRef.current.value}`);
  };
  const na = "kk";
  return (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit}>
        <label className={styles.form_label}>From: </label>
        <Autocomplete className={styles.autocomplete}>
          <input type="text" ref={originRef} required />
        </Autocomplete>
        <label className={styles.form_label}>To: </label>
        <Autocomplete>
          <input type="text" ref={destinationRef} required />
        </Autocomplete>
        <input className={styles.button} type="submit" value="Next" />
      </form>
      <div>{data}</div>
    </div>
  );
}
