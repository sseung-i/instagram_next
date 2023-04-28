import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { HEART_ICON_STYLE } from "./HeartIcon";
import { IconProps } from "@/types/Icon";

const HeartFillIcon = ({ color, size }: IconProps) => {
  return <AiFillHeart {...HEART_ICON_STYLE(color, size)} />;
};

export default HeartFillIcon;
