import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export const runtime = "edge";
const WORKER = "https://perch-api.ygtc090.workers.dev";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ saved: [] }, { status: 401 });
  try {
    const res = await fetch(`${WORKER}/saved-cafes?userId=${encodeURIComponent(session.user.id)}`);
    const data = await res.json() as { saved: unknown[] };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ saved: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as { cafe: unknown; action: string };
  try {
    const res = await fetch(`${WORKER}/saved-cafes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, cafe: body.cafe, action: body.action }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
