import { NextRequest, NextResponse } from "next/server";
import type { OmitId } from "@toolpad/core/Crud";
import { UserModel } from "@/data/users";
import { getUserById, remove, update } from "@/services/users";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user: Partial<OmitId<UserModel>> = await req.json();
  const { id } = await params;
  const updatedUser = await update(id, user);

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await remove(id);

  return NextResponse.json({ success: true });
}
