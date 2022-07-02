import React from "react";
import { Box } from "@chakra-ui/react";

export const ImageInput = ({ src, alt, id }) => {
  return (
    <>
      <Box w={{ base: "200px", sm: "250px", md: "300px" }} h="auto">
        <input type="image" src={src} id={id} alt={alt} />
      </Box>
    </>
  );
};
