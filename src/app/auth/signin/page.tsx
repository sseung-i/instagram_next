import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Signin from "@/components/ui/Signin";
import S from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instantgram",
};

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}
const SignPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const providers = (await getProviders()) ?? {};

  return (
    <section className={S.signin}>
      <h2 className={S.title}>Sign in</h2>
      <div className={S.sign_btn}>
        <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
      </div>
    </section>
  );
};

export default SignPage;
