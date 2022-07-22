import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { ImageInput } from "../components/imageInput";
import { useRouter } from "next/router";
import { Heading, Flex, Box, Center, Button, Text } from "@chakra-ui/react";
import styles from "../styles/SecondPage.module.scss";

export default function ClimateDetails({ driving, transit, bicycle }) {
  const sliderRef = useRef();
  const [timesAWeek, setTimesAWeek] = useState(1);
  const [distance, setDistance] = useState(1);
  const [mode, setMode] = useState();
  const [resultBoolean, setResultBoolean] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setTimesAWeek(e.target.value);
  };
  const handleClick = (mode) => {
    setMode(mode);
  };
  const handleSubmit = () => {
    if (mode === "bicycle") {
      setResultBoolean(true);
    } else if (mode === "driving") {
      router.push(`/results/${driving.distance}&${mode}&${timesAWeek}`);
    } else {
      router.push(`/results/${transit.distance}&${mode}&${timesAWeek}`);
    }
  };
  return (
    <div>
      {resultBoolean ? (
        <div>You are doing well</div>
      ) : (
        <div className={styles.container}>
          <h2>What mode of transportation do you use?</h2>
          <div className={styles.transportOptions}>
            <div
              className={styles.option}
              onClick={() => handleClick("driving")}
            >
              <img src={"car_icon.svg"} alt={"car"} />
              <p>{driving.distance}</p>
              <p>{driving.duration}</p>
            </div>
            <div
              className={styles.option}
              onClick={() => handleClick("transit")}
            >
              <img src={"train_icon.svg"} alt={"train"} />
              <p>{transit.distance}</p>
              <p> {transit.duration}</p>
            </div>
            <div
              className={styles.option}
              onClick={() => handleClick("bicycle")}
            >
              <img src={"bike_icon.svg"} alt={"bike"} />
              <p>{bicycle.distance}</p>
              <p>{bicycle.duration}</p>
            </div>
          </div>

          <div>
            <h2>How many times a week do you commute?</h2>
          </div>
          <input
            ref={sliderRef}
            type="range"
            min="1"
            max="7"
            step="1"
            onChange={handleChange}
            value={timesAWeek}
          />
          <div className={styles.daysIndicator}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.route.split("&");
  const [from, to] = id;

  const data = await fetchRoutes(from, to);

  return {
    props: {
      driving: {
        mode: "driving",
        distance: data.driving.drivingDistance,
        duration: data.driving.drivingDuration,
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
