import React from "react";
import { BsBookmark } from "react-icons/bs";

interface Props {
  color?: string;
  size?: number;
}

export const BOOKMARK_ICON_STYLE = (color?: string, size?: number) => {
  return {
    color: color ?? "black",
    size: size ?? 20,
  };
};

const BookmarkIcon = ({ color, size }: Props) => {
  return <BsBookmark {...BOOKMARK_ICON_STYLE} />;
};

export default BookmarkIcon;
