import React from "react";
import S from "./Avatar.module.css";

type AvatarSize = "S" | "M" | "L" | "XL";

interface Props {
  image?: string;
  size?: AvatarSize;
  highlight?: boolean;
}

const getImageSizeStyle = (size: AvatarSize): number => {
  switch (size) {
    case "S":
      return 36;
    case "M":
      return 40;
    case "L":
      return 52;
    case "XL":
      return 64;
  }
};

const Avatar = ({ image, size = "M", highlight }: Props) => {
  const IMG_SIZE = getImageSizeStyle(size);

  return (
    <>
      <div
        className={`${S.wrap} ${highlight && S.highlight}`}
        style={{
          width: `${IMG_SIZE}px`,
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
