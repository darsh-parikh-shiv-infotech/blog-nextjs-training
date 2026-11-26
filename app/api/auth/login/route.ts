import { loginToDummyJSON } from "@/lib/services/dummyjson.service";
import { createSession } from "@/lib/utils/session";
import { loginSchema } from "@/lib/validations/auth.schema";
import { MESSAGES, StatusCodes } from "@/lib/constants/constant";

import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = await loginSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const user = await loginToDummyJSON(
      validatedData.username,
      validatedData.password,
    );

    await createSession(
      String(user.id),
      user.accessToken,
      user.refreshToken,
    );

    return NextResponse.json({
      success: true,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: {
        id: String(user.id),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.COMMON.INVALID_FORM,
          errors: error.errors,
        },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    // DummyJSON responds with an error when credentials are incorrect.
    if (
      error instanceof Error &&
      error.message.includes("DummyJSON request failed")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: MESSAGES.AUTH.INVALID_CREDENTIALS,
        },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: MESSAGES.AUTH.SERVER_ERROR,
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}