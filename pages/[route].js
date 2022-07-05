import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { ImageInput } from "../components/imageInput";
import { useRouter } from "next/router";
import { Heading, Flex, Box, Center, Button, Text } from "@chakra-ui/react";

export default function ClimateDetails({ driving, walking, transit, bicycle }) {
  const sliderRef = useRef();
  const [timesAWeek, setTimesAWeek] = useState(1);
  const [distance, setDistance] = useState(1);
  const [resultBoolean, setResultBoolean] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setTimesAWeek(e.target.value);
  };
  const handleClick = (e) => {
    setDistance(e.target.value);
  };
  const handleSubmit = () => {
    const mode = distance.split("&")[1];
    console.log(mode);

    if (mode === "walking" || mode === "bicycle") {
      setResultBoolean(true);
    } else {
      router.push(`/results/${distance}&${timesAWeek}`);
    }
  };
  return (
    <>
      <Heading
        fontWeight="800"
        color="#5A5A5A"
        fontStyle="italic"
        fontSize={{ base: "3em", sm: "5em", md: "6em" }}
        textAlign="center"
      >
        greenergy
      </Heading>
      <Text
        color="#B7B7B7"
        fontSize={{ base: "1em", sm: "2em", md: "3em" }}
        textAlign="center"
      >
        travel carbon footprint calculator
      </Text>
      {resultBoolean ? (
        <div>You are doing well</div>
      ) : (
        <div>
          <Flex
            flexDirection="column"
            my="3em"
            mx="1em"
            alignItems="center"
            justifyContent="center"
          >
            <Flex flexDirection="row">
              <Box my="1em" mx=".5em">
                <p>{bicycle.distance}</p>
                <p>{bicycle.duration}</p>
                <ImageInput
                  src={"https://svgshare.com/i/ike.svg"}
                  id={"bike"}
                  alt={"bike"}
                  value={`${transit.distance}&${transit.mode}`}
                  onClick={handleClick}
                />
              </Box>
              <Box my="1em" mx=".5em">
                <p>{transit.distance}</p>
                <p> {transit.duration}</p>
                <ImageInput
                  src={"https://svgshare.com/i/img.svg"}
                  id={"train"}
                  alt={"train"}
                  value={`${transit.distance}&${transit.mode}`}
                  onClick={handleClick}
                />
              </Box>
            </Flex>
            <Flex Flex flexDirection="row">
              <Box my="1em" mx=".5em">
                <p>
                  {driving.distance}
                  <p>{driving.duration}</p>
                </p>
                <ImageInput
                  src={"https://svgshare.com/i/ikf.svg"}
                  id={"car"}
                  alt={"car"}
                  value={`${driving.distance}&${driving.mode}`}
                  onClick={handleClick}
                />
              </Box>
              <Box my="1em" mx=".5em">
                <p>{walking.distance}</p>
                <p> {walking.duration}</p>
                <ImageInput
                  src={"https://svgshare.com/i/ikk.svg"}
                  id={"walking"}
                  alt={"walking"}
                  value={`${walking.distance}&${walking.mode}`}
                  onClick={handleClick}
                />
              </Box>
            </Flex>
          </Flex>

          <div style={{ textAlign: "center" }}>
            <p sty>How many times a week do you commute?</p>
          </div>
          <Center>
            <input
              ref={sliderRef}
              type="range"
              min="1"
              max="7"
              step="1"
              onChange={handleChange}
              value={timesAWeek}
            />
          </Center>
          <Center>
            <div>{timesAWeek} days </div>
          </Center>
          <Center>
            <Button onClick={handleSubmit}>Submit</Button>
          </Center>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.route.split("&");
  const [from, to] = id;

  const data = await fetchRoutes(from, to);

  console.log(data);

  return {
    props: {
      driving: {
        mode: "driving",
        distance: data.driving.drivingDistance,
        duration: data.driving.drivingDuration,
      },
      walking: {
        mode: "walking",
        distance: data.walking.walkingDistance,
        duration: data.walking.walkingDuration,
      },
      transit: {
        mode: "transit",
        distance: data.transit.transitDistance,
        duration: data.transit.transitDuration,
      },
      bicycle: {
        mode: "bicycle",
        distance: data.bicycle.bicycleDistance,
        duration: data.bicycle.bicycleDuration,
      },
    },
  };
}
