import React from "react";
import { ImageInput } from "../components/imageInput";

export default function Route() {
  return (
    <>
      <ImageInput
        src={"https://svgshare.com/i/ike.svg"}
        id={"bike"}
        alt={"bike"}
      />
      <ImageInput
        src={"https://svgshare.com/i/img.svg"}
        id={"train"}
        alt={"train"}
      />
      <ImageInput
        src={"https://svgshare.com/i/ikf.svg"}
        id={"car"}
        alt={"car"}
      />
      <ImageInput
        src={"https://svgshare.com/i/ikk.svg"}
        id={"walking"}
        alt={"walking"}
      />
    </>
  );
}
