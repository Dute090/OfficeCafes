import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const session = await auth();
  return NextResponse.json({
    userId: session?.user?.id ?? null,
    email: session?.user?.email ?? null,
    name: session?.user?.name ?? null,
    raw_session: session ?? null,
  });
}
