import React from "react";
import ZoomSlider from "react-instagram-zoom-slider";
import { EggFirst, EggSecond } from "./../../icons";

function Intro() {
  const slides = [
    <EggFirst alt="First slide" />,
    <EggSecond src="..." alt="Second slide" />,
  ];

  return <ZoomSlider slides={slides} />;
}
export default Intro;
