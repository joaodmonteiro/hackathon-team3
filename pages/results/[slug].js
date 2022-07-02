export default function Results({ co2e }) {
  return <div>results: {co2e}kg of co2e</div>;
}

export async function getServerSideProps(context) {
  const info = context.params.slug.split("&");

  const distance = +info[0];
  const transport = info[1];

  const resp = await fetch("https://beta3.api.climatiq.io/estimate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CLIMATIQ_API}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emission_factor: transport,
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
      co2e: data.co2e.toFixed(2),
    },
  };
}
