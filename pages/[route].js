import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { ImageInput } from "../components/imageInput";
import { useRouter } from "next/router";
import { Heading, Flex, Box, Center, Button, Text } from "@chakra-ui/react";
import styles from "../styles/SecondPage.module.scss";
import ProgressBar from "../components/ProgressBar";

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
  const handleSelectRoute = (mode) => {
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
          <div>
            <div className={styles.questions}>
              <div className={styles.question}>
                <h2>What mode of transportation do you use?</h2>
                <div className={styles.transportOptions}>
                  <div
                    className={
                      mode === "driving"
                        ? `${styles.option} ${styles.selectedOption}`
                        : `${styles.option}`
                    }
                    onClick={() => handleSelectRoute("driving")}
                  >
                    <img src={"car_icon.svg"} alt={"car"} />
                    <p>{driving.distance} km</p>
                    <p>{driving.duration}</p>
                  </div>
                  <div
                    className={
                      mode === "transit"
                        ? `${styles.option} ${styles.selectedOption}`
                        : `${styles.option}`
                    }
                    onClick={() => handleSelectRoute("transit")}
                  >
                    <img src={"train_icon.svg"} alt={"train"} />
                    <p>{transit.distance} km</p>
                    <p> {transit.duration}</p>
                  </div>
                  <div
                    className={
                      mode === "bicycle"
                        ? `${styles.option} ${styles.selectedOption}`
                        : `${styles.option}`
                    }
                    onClick={() => handleSelectRoute("bicycle")}
                  >
                    <img src={"bike_icon.svg"} alt={"bike"} />
                    <p>{bicycle.distance} km</p>
                    <p>{bicycle.duration}</p>
                  </div>
                </div>
              </div>

              <div className={styles.question}>
                <h2>How many times a week do you commute?</h2>

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
              </div>
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>

          <ProgressBar state={2} />
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
