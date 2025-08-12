import { postUserStep2 } from "@/app/lib/db";
import { PanBodySchema } from "@/app/util";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PanBodySchema.parse(body);
    const userAfterPan = await postUserStep2(
      parsed.aadhaar,
      parsed.panName,
      parsed.pan,
      Number(parsed.type),
      new Date(parsed.dob)
    );
    return NextResponse.json({
      success: true,
      user: userAfterPan,
      message: "Registration Complete",
    });
  } catch (err) {
    console.log("error in pan : ", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: err.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
