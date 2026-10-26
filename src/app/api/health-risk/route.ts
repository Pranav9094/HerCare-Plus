import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  screenHealthRisk,
  validateScreeningInput,
} from "@/lib/healthRiskScreening";

const MAX_BODY_BYTES = 16_384;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (request.headers.get("content-length")) {
    const length = Number(request.headers.get("content-length"));
    if (!Number.isFinite(length) || length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
    }
  }

  try {
    const input = validateScreeningInput(await request.json());
    return NextResponse.json(screenHealthRisk(input), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request body.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
