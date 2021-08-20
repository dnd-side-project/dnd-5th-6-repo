import React from "react";
import ZoomSlider from "react-instagram-zoom-slider";

function Intro() {
  const slides = [
    <img src="..." alt="First slide" />,
    <img src="..." alt="Second slide" />,
  ];

  return <ZoomSlider slides={slides} />;
}
export default Intro;
