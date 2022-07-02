import { Input } from "@chakra-ui/react";

import React from "react";

const PrimaryInput = ({ size, placeholder, value, onChange }) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      //   value={value}
      onChange={onChange}
    />
  );
};

export default PrimaryInput;
