import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { ImageInput } from "../components/imageInput";
import { useRouter } from "next/router";
import { Flex, Box, Center, Button } from "@chakra-ui/react";

export default function ClimateDetails({ driving, walking, transit, bicycle }) {
  const sliderRef = useRef();
  const [timesAWeek, setTimesAWeek] = useState(1);
  const [distance, setDistance] = useState(1);
  const router = useRouter();

  const handleChange = (e) => {
    setTimesAWeek(e.target.value);
  };
  const handleClick = (e) => {
    setDistance(e.target.value);
  };
  const handleSubmit = () => {
    router.push(`/results/${distance}&${timesAWeek}`);
  };
  return (
    <>
      <Flex
        flexDirection="column"
        my="3em"
        mx="1em"
        alignItems="center"
        justifyContent="center"
      >
        <Flex flexDirection="row">
          <Box my="1em" mx=".5em">
            <p>
              {" "}
              bicycle
              {bicycle.distance}, {bicycle.duration}
            </p>
            <ImageInput
              src={"https://svgshare.com/i/ike.svg"}
              id={"bike"}
              alt={"bike"}
              value={`${transit.distance}&${transit.mode}`}
              onClick={handleClick}
            />
          </Box>
          <Box my="1em" mx=".5em">
            <p>
              transit
              {transit.distance}, {transit.duration}
            </p>
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
              {" "}
              {driving.distance}, {driving.duration}
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
            <p>
              {" "}
              walking
              {walking.distance}, {walking.duration}
            </p>
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
      {/* <div>
        driving
        {driving.distance}, {driving.duration}
        <input
          type="radio"
          name="mode"
          value={`${driving.distance}&${driving.mode}`}
          data-mode="bicycle"
          onClick={handleClick}
        />
      </div>
      <div>
        walking
        {walking.distance}, {walking.duration}
        <input
          type="radio"
          name="mode"
          value={`${walking.distance}&${walking.mode}`}
          data-mode="bicycle"
          onClick={handleClick}
        />
      </div>
      <div>
        transit
        {transit.distance}, {transit.duration}
        <input
          type="radio"
          name="mode"
          value={`${transit.distance}&${transit.mode}`}
          data-mode="bicycle"
          onClick={handleClick}
        />
      </div>
      <div>
        bicycle
        {bicycle.distance}, {bicycle.duration}
        <input
          type="radio"
          name="mode"
          value={`${bicycle.distance}&${bicycle.mode}`}
          data-mode="bicycle"
          onClick={handleClick}
        />
      </div> */}
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
