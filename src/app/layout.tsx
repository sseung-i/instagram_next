import Header from "@/components/header/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";

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
      <body>
        <Header />
        <section>{children}</section>
      </body>
    </html>
  );
}
