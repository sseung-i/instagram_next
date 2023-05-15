import NewPostForm from "@/components/newpost_form/NewPostForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};
const NewPostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/auth/signin");

  return <NewPostForm user={session.user} />;
};

export default NewPostPage;
