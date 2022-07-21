import Head from "next/head";
import Image from "next/image";
import Form1 from "../components/Form1";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Greenergy</h1>
      <h2>The carbon footprint of your commuting</h2>
      <Form1 />
    </div>
  );
}
