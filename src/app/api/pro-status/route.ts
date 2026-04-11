import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ isPro: false }, { status: 401 });
  }

  const userId = session.user.id;
  const workerUrl = `https://perch-api.ygtc090.workers.dev/pro-status?userId=${encodeURIComponent(userId)}`;

  try {
    const res = await fetch(workerUrl);
    const data = await res.json() as { isPro: boolean; plan?: string; expiresAt?: number };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ isPro: false });
  }
}
