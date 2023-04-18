import React from "react";
import { BsBookmark } from "react-icons/bs";

export const BOOKMARK_ICON_STYLE = {
  color: "black",
  size: 20,
};

const BookmarkIcon = () => {
  return <BsBookmark {...BOOKMARK_ICON_STYLE} />;
};

export default BookmarkIcon;
