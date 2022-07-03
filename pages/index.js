
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

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }