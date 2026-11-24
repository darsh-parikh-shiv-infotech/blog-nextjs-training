import { MESSAGES } from "@/lib/constants/constant";
import { deleteSession } from "@/lib/utils/session";
import { NextResponse } from "next/server";

export async function POST() {
  await deleteSession();

  return NextResponse.json({
    message: MESSAGES.AUTH.LOGOUT_SUCCESS,
  });
}
