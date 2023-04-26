import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  color?: string;
  size?: number;
}

export const HEART_ICON_STYLE = (color?: string, size?: number) => {
  return {
    color: color ?? "black",
    size: size ?? 24,
  };
};

const HeartIcon = ({ color, size }: Props) => {
  return <AiOutlineHeart {...HEART_ICON_STYLE(color, size)} />;
};

export default HeartIcon;
