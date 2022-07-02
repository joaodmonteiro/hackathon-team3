import { Image, Box } from "@chakra-ui/react";

import React from "react";

const LargeImage = ({ src, alt }) => {
  return (
    <Box w={{ base: "210px", sm: "300px", md: "390px" }}>
      <Image src={src} alt={alt} />
    </Box>
  );
};

export default LargeImage;
