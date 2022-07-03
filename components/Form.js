import { useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import { useRouter } from "next/router";

import calculateRoute from "../hooks/calculateRoute";

export default function Form({ data }) {
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

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>From: </div>
        <Autocomplete>
          <input type="text" ref={originRef} required />
        </Autocomplete>
        <div>To: </div>
        <Autocomplete>
          <input type="text" ref={destinationRef} required />
        </Autocomplete>

        {/* <Link href={`/${from}&${to}`}> */}
        <input type="submit" value="Submit" />
        {/* </Link> */}
      </form>
      <div>{data}</div>
    </div>
  );
}
