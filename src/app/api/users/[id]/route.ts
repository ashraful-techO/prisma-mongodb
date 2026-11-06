import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE USER
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        age: body.age ? Number(body.age) : null,
      },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 400 },
    );
  }
}

// DELETE USER
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 400 },
    );
  }
}
