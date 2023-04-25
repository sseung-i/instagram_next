import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSearchUsers } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  return getSearchUsers().then(NextResponse.json);
}
