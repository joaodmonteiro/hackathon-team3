export default function SecondPage({ data }) {
  return <div>{data.routes[0].copyrights}</div>;
}

export async function getServerSideProps(context) {
  const location = context.params.route.split("&");

  const from = location[0];
  const to = location[1];

  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );

  const data = await resp.json();
  console.log(data);

  return {
    props: {
      data: data,
    },
  };
}
