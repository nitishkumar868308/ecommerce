/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { userSchema } from "@/validator/userSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedData.error.errors },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.data.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
