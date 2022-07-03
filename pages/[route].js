import { useRef, useState } from "react";
import fetchRoutes from "../hooks/fetchHook";
import { useRouter } from "next/router";

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
    router.push(`/results/${distance}`);
  };
  return (
    <div>
      <div>
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
