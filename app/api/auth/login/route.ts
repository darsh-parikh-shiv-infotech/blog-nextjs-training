import { getUserByEmail } from "@/lib/api/users";
import { MESSAGES, StatusCodes } from "@/lib/constants/constant";
import { createSession } from "@/lib/utils/session";
import { verifyPassword } from "@/lib/utils/utils";
import { loginSchema } from "@/lib/validations/auth.schema";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = await loginSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const user = await getUserByEmail(validatedData.email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { message: MESSAGES.AUTH.INVALID_CREDENTIALS },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const isPasswordValid = await verifyPassword(
      validatedData.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: MESSAGES.AUTH.INVALID_CREDENTIALS },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          message: "Please check your submitted information.",
          errors: error.errors,
        },
        { status: StatusCodes.BAD_REQUEST },
      );
    }

    return NextResponse.json(
      { message: MESSAGES.AUTH.SERVER_ERROR },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
