import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { useRouter } from "next/router";

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
    <div>
      {resultBoolean && <div>Green Energy</div>}
      {resultBoolean ? (
        <div>You are doing well</div>
      ) : (
        <div>
          <div>
            driving:
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
            walking:
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
            distance:
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
            bicycle:
            {bicycle.distance}, {bicycle.duration}
            <input
              type="radio"
              name="mode"
              value={`${bicycle.distance}&${bicycle.mode}`}
              data-mode="bicycle"
              onClick={handleClick}
            />
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

          <div>{timesAWeek} days </div>
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
