import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSearchUsers } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  return getSearchUsers().then(NextResponse.json);
}
