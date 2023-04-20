"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface Props {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}
const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map(({ id, name }) => (
        <button
          key={name}
          className={id}
          onClick={() => signIn(id, { callbackUrl })}
        >
          {id === "google" && (
            <>
              <FcGoogle size="18px" />
              <span>Sign in with Google</span>
            </>
          )}
        </button>
      ))}
      <style jsx>
        {`
          button.google {
            height: 40px;
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 8px;
            border: 1px solid var(--light-gray);
            border-radius: 6px;
            font-size: 14px;
            background-color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default Signin;
