import Header from "@/components/header/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import S from "./layout.module.css";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Instargram",
  description: "next13으로 Instagram 만들기",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={openSans.className}>
      <body className={S.body}>
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
