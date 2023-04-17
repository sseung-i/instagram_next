import React from "react";
import S from "./Avatar.module.css";

interface Props {
  image?: string;
  size?: "S" | "M" | "L";
  highlight?: boolean;
}

const Avatar = ({ image, size = "M", highlight = false }: Props) => {
  const IMG_SIZE = size === "S" ? 36 : size === "M" ? 40 : 52;
  return (
    <>
      <div
        className={`${S.wrap} ${highlight && "highlight"}`}
        style={{
          minWidth: `${IMG_SIZE}px`,
          height: `${IMG_SIZE}px`,
          borderRadius: `${IMG_SIZE / 2}px`,
        }}
      >
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          className={`${S.image}`}
          style={{
            borderRadius: `${IMG_SIZE / 2}px`,
          }}
          src={image ?? undefined}
          alt="user profile"
          referrerPolicy="no-referrer"
        />
      </div>
    </>
  );
};

export default Avatar;
