import { MESSAGES, StatusCodes } from "@/lib/constants/constant";
import { getCurrentUser } from "@/lib/utils/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: MESSAGES.AUTH.UNAUTHORIZED },
      { status: StatusCodes.UNAUTHORIZED },
    );
  }

  return NextResponse.json({ user });
}
