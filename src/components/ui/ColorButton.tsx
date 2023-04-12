import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

const ColorButton = ({ text, onClick }: Props) => {
  return (
    <>
      <div>
        <button onClick={onClick}>{text}</button>
      </div>
      <style jsx>
        {`
          div {
            border: 2px solid transparent;
            border-radius: 4px;
            background: border-box,
              linear-gradient(to right, red 0%, orange 100%);
            background-origin: border-box;
            background-clip: content-box, border-box;
          }

          button {
            padding: 0.3rem 0.4rem;
            border-radius: 2px;
            transition: opacity 0.5s;
            background-color: #fff;
            border: 2px solid transparent;
          }

          button:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </>
  );
};

export default ColorButton;
