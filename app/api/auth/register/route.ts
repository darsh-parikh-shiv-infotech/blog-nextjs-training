import { createUser, getUserByEmail } from "@/lib/api/users";
import { MESSAGES, StatusCodes } from "@/lib/constants/constant";
import { createSession } from "@/lib/utils/session";
import { hashPassword } from "@/lib/utils/utils";
import { registerSchema } from "@/lib/validations/auth.schema";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = await registerSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const existingUser = await getUserByEmail(
      validatedData.email.toLowerCase(),
    );

    if (existingUser) {
      return NextResponse.json(
        { message: MESSAGES.AUTH.EMAIL_ALREADY_EXISTS },
        { status: StatusCodes.CONFLICT },
      );
    }

    const passwordHash = await hashPassword(validatedData.password);

    const user = await createUser({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    });

    await createSession(user.id);

    return NextResponse.json(
      {
        message: MESSAGES.AUTH.REGISTRATION_SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: StatusCodes.CREATED },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          message: MESSAGES.COMMON.INVALID_FORM,
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
