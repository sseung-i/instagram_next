import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export const HEART_ICON_STYLE = {
  color: "black",
  size: 24,
};

const HeartIcon = () => {
  return <AiOutlineHeart {...HEART_ICON_STYLE} />;
};

export default HeartIcon;
