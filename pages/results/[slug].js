// NEED this!
import { Flex, Box, Text, Image } from "@chakra-ui/react";

export default function Results({ co2e }) {
  // RESULT-PAGE branch start
  // A tree absorbs 21kg of co2 in a year
  // 57g per day
  const tree = Math.floor(co2e / 0.057);

  // 100g of steak emits 50kg of co2
  const steak = co2e * 0.02 * 365;
  const steakToFixed = steak.toFixed(2);

  // water bottle (500ml) is 32-34g
  // 1kg plastic emits 2.9kg of co2
  // Therefore, 1 bottle(500ml) of plastic emits around 100g(0.1kg) of co2
  const bottle = co2e / 0.1;

  const weeklyEmission = Math.round((co2e / 238) * 100);

  return (
    <>
      <Flex p="1em" direction="column" w="100vw" h="100vh">
        <Flex direction="row">
          <Box
            w={{ base: "8em" }}
            h={{ base: "8em" }}
            borderRadius="50%"
            bg="#12D826"
            color="#FFFFFF"
            mr="2em"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="3em">{weeklyEmission}%</Text>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text>Some text goes here</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" justifyContent="center" my="1em" h="100%">
          <Flex
            w="100%"
            flexDirection="row"
            h={{ base: "9em", sm: "15em", md: "20em" }}
          >
            <Image
              h={{ base: "9em" }}
              src={"https://svgshare.com/i/inZ.svg"}
              alt={"tree"}
            />
            <Box
              w="100%"
              borderRadius="12px"
              display="flex"
              alignItems="center"
            >
              {co2e}kg : This journey emits the amount of carbon that {tree}{" "}
              trees absorbs per year.
            </Box>
          </Flex>
          <Flex
            w="100%"
            flexDirection="row"
            h={{ base: "9em", sm: "15em", md: "20em" }}
          >
            <Box
              w="100%"
              borderRadius="12px"
              display="flex"
              alignItems="center"
            >
              Did you know that to produce 100g of protein, beef production
              emits around 50kg of green house gas emissions? Following this
              fact, your journey is same amount of {steakToFixed} steaks(100g)
              in a year.
            </Box>
            <Image
              w="100%"
              h={{ base: "8em" }}
              src={"https://svgshare.com/i/inD.svg"}
              alt={"cow"}
            />
          </Flex>
          <Flex
            w="100%"
            alignItems="center"
            flexDirection="row"
            h={{ base: "9em", sm: "15em", md: "20em" }}
          >
            <Image
              h={{ base: "7em" }}
              src={"https://svgshare.com/i/inE.svg"}
              alt={"bottle"}
            />
            <Box
              w="100%"
              h="100%"
              borderRadius="12px"
              display="flex"
              alignItems="center"
            >
              That is same as like {bottle} plastic water bottles! (500ml)
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
    // RESULT-PAGE branch end
  );
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
