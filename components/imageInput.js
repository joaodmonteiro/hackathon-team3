import React from "react";
import { Box, Center } from "@chakra-ui/react";

export const ImageInput = ({ src, alt, id, value, onClick }) => {
  return (
    <>
      <Box px="1em" py="1em" border={"solid 1px #E7E7E7"} borderRadius="12px">
        <Center w="100px" h="100px">
          <input
            type="image"
            src={src}
            id={id}
            alt={alt}
            value={value}
            onClick={onClick}
          />
        </Center>
      </Box>
    </>
  );
};
