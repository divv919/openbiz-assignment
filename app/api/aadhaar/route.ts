import { checkUser, postUserStep1 } from "@/app/lib/db";
import { AadhaarBodySchema } from "@/app/util";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("from aadhaar route", body);
    const parsed = AadhaarBodySchema.parse(body);
    console.log("Working after parsing");
    const user = await checkUser(parsed.aadhaar);
    if (user && user.currentStep > 1) {
      NextResponse.json({
        success: true,
        user,
        message:
          user.currentStep === 2
            ? "User already registered Aadhaar details"
            : "User already filled the form",
      });
    }
    const newUser = await postUserStep1(parsed.aadhaar, parsed.aadhaarName);

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log("error is ", err);

    if (err instanceof z.ZodError) {
      const errorMessages = err.issues.map((errorObject) => {
        return errorObject.message;
      });
      // console.log("errorobj is ", errorObj);
      return NextResponse.json(
        { success: false, errors: errorMessages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
