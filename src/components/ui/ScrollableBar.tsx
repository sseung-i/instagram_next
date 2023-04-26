"use client";

import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desk: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 576 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};

interface Props {
  children: React.ReactNode;
}
const ScrollableBar = ({ children }: Props) => {
  return <Carousel responsive={responsive}>{children}</Carousel>;
};

export default ScrollableBar;
