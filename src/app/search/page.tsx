import Search from "@/components/search/Search";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

const page = () => {
  return <Search />;
};

export default page;
