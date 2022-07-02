import Link from "next/link";
import { useState } from "react";

export default function SecondPage({ distance, unit }) {
  const transport = {
    train: "passenger_train-route_type_underground-fuel_source_na",
    bus: "passenger_vehicle-vehicle_type_local_bus-fuel_source_na-distance_na-engine_size_na",
    car: "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na",
  };

  const [transportMethod, setTransportMethod] = useState(transport.train);

  return (
    <div>
      Distance: {distance}
      {unit}
      <Link href={`/results/${distance}&${transportMethod}`}>
        GET EMISSIONS DATA
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  let distanceAmount = 0;
  let unit = "km";
  if (context.params.route != "favicon.ico") {
    const location = context.params.route.split("&");

    const fromLocation = location[0].split(" ").join("+");
    const toLocation = location[1].split(" ").join("+");

    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${fromLocation}&destination=${toLocation}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
    );

    const data = await resp.json();

    if (data.status === "OK") {
      const distance = data.routes[0].legs[0].distance.text.split(" ");

      [distanceAmount, unit] = distance;
    }
  }

  return {
    props: {
      distance: distanceAmount,
      unit: unit,
    },
  };
}
