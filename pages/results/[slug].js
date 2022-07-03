export default function Results({ data }) {
  return <div>results: {data.co2e.toFixed(2)}kg</div>;
}
export async function getServerSideProps(context) {
  const transportOptions = {
    transit:
      "passenger_vehicle-vehicle_type_local_bus-fuel_source_na-distance_na-engine_size_na",
    driving:
      "passenger_vehicle-vehicle_type_black_cab-fuel_source_na-distance_na-engine_size_na",
  };
  const info = context.params.slug.split("&");
  const distance = +info[0].split(",")[0];
  console.log(distance);
  const transport = info[1];
  const climateTransport =
    transport === "driving"
      ? transportOptions.driving
      : transportOptions.transit;
  const resp = await fetch("https://beta3.api.climatiq.io/estimate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CLIMATIQ_API}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emission_factor: climateTransport,
      parameters: {
        passengers: 1,
        distance: distance,
        distance_unit: "km",
      },
    }),
  });
  const data = await resp.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
