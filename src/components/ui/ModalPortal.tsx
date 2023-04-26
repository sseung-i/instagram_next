import React from "react";
import reactDom from "react-dom";

interface Props {
  children: React.ReactNode;
}
const ModalPortal = ({ children }: Props) => {
  if (typeof window === "undefined") {
    //SSR은 제외
    return null;
  }

  const node = document.getElementById("portal") as Element;
  return reactDom.createPortal(children, node);
};

export default ModalPortal;
