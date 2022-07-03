import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";
import { Heading, Flex, Text, Box } from "@chakra-ui/react";
export default function Home() {
  return (
    <div>
      <Flex
      alignItems="center"
      flexDirection="column"
      my="2em"
      mx="2em"
      >
      <Heading
      fontWeight="800"
      color="#5A5A5A"
      fontStyle="italic"
      fontSize={{base: "3em", sm: "5em", md: "6em"}}
      >greenergy</Heading>
      <Text
      color="#B7B7B7"
      fontSize={{base: "1em", sm: "2em", md: "3em"}}
      >travel carbon footprint calculator</Text>
      <Box
      mt="2em"
      >
<Form/>
      </Box>
      </Flex>
    </div>
  );
}
// export async function getStaticPaths() {
//   // Return a list of possible value for id
// }
// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }






