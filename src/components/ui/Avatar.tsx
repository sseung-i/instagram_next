import React from "react";

interface Props {
  image?: string;
}
const Avatar = ({ image }: Props) => {
  return (
    <>
      <div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={image ?? undefined}
          alt="user profile"
          referrerPolicy="no-referrer"
        />
      </div>
      <style jsx>
        {`
          div {
            width: 36px;
            height: 36px;
            border: 2px solid transparent;
            border-radius: 18px;
            background: border-box,
              linear-gradient(to right, red 0%, orange 100%);
            background-origin: border-box;
            background-clip: content-box, border-box;
            overflow: hidden;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        `}
      </style>
    </>
  );
};

export default Avatar;
