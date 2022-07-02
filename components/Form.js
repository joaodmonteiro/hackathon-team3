import Link from "next/link";
import { useRef, useState } from "react";
import { ImageInput } from "../components/imageInput";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { VStack, Box, StackDivider } from "@chakra-ui/react";

import calculateRoute from "../hooks/calculateRoute";

export default function Form({ data }) {
  const originRef = useRef();
  const destinationRef = useRef();

  // usestate of distance and time for all the modes of travel.
  const [displayTransportMode, setDisplayTransportMode] = useState(false);
  const [drivingDistance, setDrivingDistance] = useState();
  const [drivingDuration, setDrivingDuration] = useState();
  const [bycicleDistance, setBycicleDistance] = useState();
  const [bycicleDuration, setBycicleDuration] = useState();
  const [transitDistance, setTransitDistance] = useState();
  const [transitDuration, setTransitDuration] = useState();
  const [walkingDistance, setWalkingDistance] = useState();
  const [walkingDuration, setWalkingDuration] = useState();
  const [directionsResponse, setDirectionsresponse] = useState();

  // initial position of the map on first redet
  const mapCenter = { lat: 48.8544, lng: 2.2945 };

  // loads your ApiKey into the googleMaps Api.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KAZ,
    libraries: ["places"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await calculateRoute(originRef, destinationRef);

    // to show direction on the map
    setDirectionsresponse(results.drivingResults);
    // sets the  states for all the modes of transport
    setDrivingDistance(results.drivingResults.routes[0].legs[0].distance.text);
    setDrivingDuration(results.drivingResults.routes[0].legs[0].duration.text);
    setBycicleDistance(results.bycicleResults.routes[0].legs[0].distance.text);
    setBycicleDuration(results.bycicleResults.routes[0].legs[0].duration.text);
    setTransitDistance(results.transitResults.routes[0].legs[0].distance.text);
    setTransitDuration(results.transitResults.routes[0].legs[0].duration.text);
    setWalkingDistance(results.walkingResults.routes[0].legs[0].distance.text);
    setWalkingDuration(results.walkingResults.routes[0].legs[0].duration.text);
    setDisplayTransportMode(true);
  };

  return (
    <div>
      <form action="">
        <div>From: </div>
        <Autocomplete>
          <input type="text" ref={originRef} />
        </Autocomplete>
        <div>To: </div>
        <Autocomplete>
          <input type="text" ref={destinationRef} />
        </Autocomplete>

        {/* <Link href={`/${from}&${to}`}> */}

        {/* </Link> */}
        <button onClick={handleSubmit}>Submit</button>
        {displayTransportMode && (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            <Box h="40px" bg="yellow.200" style={{ display: "flex" }}>
              <ImageInput
                src={"https://svgshare.com/i/ikk.svg"}
                id={"walking"}
                alt={"walking"}
              />
              <div>
                <p>Distance :{walkingDistance}</p>
                <p>Time:{walkingDuration}</p>
              </div>
            </Box>
            <Box h="40px" bg="tomato" style={{ display: "flex" }}>
              <ImageInput
                src={"https://svgshare.com/i/ikf.svg"}
                id={"car"}
                alt={"car"}
              />
              <div>
                <p>Distance :{drivingDistance}</p>
                <p>Time:{drivingDuration}</p>
              </div>
            </Box>
            <Box h="40px" bg="pink.100" style={{ display: "flex" }}>
              <ImageInput
                src={"https://svgshare.com/i/img.svg"}
                id={"train"}
                alt={"train"}
              />
              <div>
                <p>Distance :{transitDistance}</p>
                <p>Time:{transitDuration}</p>
              </div>
            </Box>
            <Box h="40px" bg="pink.100" style={{ display: "flex" }}>
              <ImageInput
                src={"https://svgshare.com/i/ike.svg"}
                id={"bike"}
                alt={"bike"}
              />
              <div>
                <p>Distance :{bycicleDistance}</p>
                <p>Time:{bycicleDuration}</p>
              </div>
            </Box>
          </VStack>
        )}
        <GoogleMap
          center={mapCenter}
          zoom={15}
          mapContainerStyle={{ width: "60vw", height: "60vh" }}
        >
          <Marker position={mapCenter} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </form>
      <div>{data}</div>
    </div>
  );
}

// maps.googleapis.com/maps/api/js?key=AIzaSyArfnT6ldB6HunVSN0_dmZHlaI4BFX5aUY&libraries=places"
