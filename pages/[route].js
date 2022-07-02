export default function SecondPage({ data }) {
  console.log(data)
  return <div></div>;
}

export async function getServerSideProps(context) {
  const location = context.params.route.split("&");

  const from = location[0];
  const to = location[1];

  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );

  const data = await resp.json();

  const distance = data.routes[0].legs[0].distance.text.split(" ");

  const [distanceAmount, unit] = distance;

  console.log(data.routes[0].legs[0].steps);

  return {
    props: {
      data: data,
    },
  };
}
