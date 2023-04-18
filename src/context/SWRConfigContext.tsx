"use client";

import React from "react";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}
const SWRConfigContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
