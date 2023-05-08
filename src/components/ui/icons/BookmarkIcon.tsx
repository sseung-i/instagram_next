import { IconProps } from "@/types/Icon";
import React from "react";
import { BsBookmark } from "react-icons/bs";

export const BOOKMARK_ICON_STYLE = (color?: string, size?: number) => {
  return {
    color: color ?? "black",
    size: size ?? 20,
  };
};

const BookmarkIcon = ({ color, size }: IconProps) => {
  return <BsBookmark {...BOOKMARK_ICON_STYLE(color, size)} />;
};

export default BookmarkIcon;
