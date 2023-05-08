import { IconProps } from "@/types/Icon";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export const HEART_ICON_STYLE = (color?: string, size?: number) => {
  return {
    color: color ?? "black",
    size: size ?? 24,
  };
};

const HeartIcon = ({ color, size }: IconProps) => {
  return <AiOutlineHeart {...HEART_ICON_STYLE(color, size)} />;
};

export default HeartIcon;
