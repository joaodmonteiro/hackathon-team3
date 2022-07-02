import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div>hello</div>;
}

export async function getServerSideProps() {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=london&destination=leeds&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );

  const data = await resp.json();
  console.log(data);

  return {
    props: {},
  };
}
