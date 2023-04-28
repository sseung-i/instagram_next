import React from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { BOOKMARK_ICON_STYLE } from "./BookmarkIcon";
import { IconProps } from "@/types/Icon";

const BookmarkFillIcon = ({ color, size }: IconProps) => {
  return <BsBookmarkFill {...BOOKMARK_ICON_STYLE(color, size)} />;
};

export default BookmarkFillIcon;
