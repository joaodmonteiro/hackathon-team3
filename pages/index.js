
import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Form />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
