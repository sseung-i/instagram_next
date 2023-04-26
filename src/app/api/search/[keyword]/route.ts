import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSearchUsers } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    keyword: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  return getSearchUsers(context.params.keyword).then(NextResponse.json);
}
