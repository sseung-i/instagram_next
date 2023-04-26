import Header from "@/components/header/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import S from "./layout.module.css";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "instantgram",
    template: "instantgram | %s",
  },
  description: "next13으로 Instagram 만들기 : Instantgram",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={openSans.className}>
      <body>
        <AuthContext>
          <Header />
          <main className={S.main}>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
