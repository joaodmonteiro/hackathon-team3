import { useRef, useState } from "react";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/router";
import calculateRoute from "../hooks/calculateRoute";
export default function Form({ data }) {
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
    <div>
      <Flex alignItems="center" flexDirection="column" my="1em" mx="2em">
        <form action="" onSubmit={handleSubmit}>
          <Flex flexDirection="column">
            <Box
              borderRadius="12px"
              p="1em"
              mb="2em"
              border={"solid 1.5px #F5F5F5"}
            >
              <Text>
                Compare different ways to travel with our carbon footprint
                calculator. Enter a start and end destination and we’ll show you
                the environmental impact. Easy to read and easy for you to
                digest.
              </Text>
            </Box>
            <Text fontWeight="600">Enter your start and end points</Text>
            <Box
              display="flex"
              flexDirection="row"
              py="1em"
              my="1em"
              borderRadius="12px"
              px="1em"
              border={"solid 1.5px #F5F5F5"}
            >
              <Box w="5em">
                <div>From: </div>
              </Box>
              <Autocomplete>
                <input type="text" ref={originRef} required />
              </Autocomplete>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              py="1em"
              borderRadius="12px"
              px="1em"
              border={"solid 1.5px #F5F5F5"}
            >
              <Box w="5em">
                <div>To: </div>
              </Box>
              <Autocomplete>
                <input type="text" ref={destinationRef} required />
              </Autocomplete>
            </Box>
            {/* <Link href={`/${from}&${to}`}> */}
            <Box display="flex" justifyContent={"flex-end"} my="2em">
              {/* <input type="submit" value="Submit" /> */}
              <input
                type="image"
                src="https://svgshare.com/i/ikm.svg"
                border="0"
                alt="Submit"
              />
            </Box>
            {/* </Link> */}
          </Flex>
        </form>
        <div>{data}</div>
      </Flex>
    </div>
  );
}
