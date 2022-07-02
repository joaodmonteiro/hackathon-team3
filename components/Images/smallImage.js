import { Image, Box } from "@chakra-ui/react";

import React from "react";

const SmallImage = ({ src, alt }) => {
  return (
    <Box w={{ base: "70px", sm: "100px", md: "130px" }}>
      <Image src={src} alt={alt} />
    </Box>
  );
};

export default SmallImage;
