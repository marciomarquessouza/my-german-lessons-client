import { NextRequest, NextResponse } from "next/server";
import type { OmitId } from "@toolpad/core/Crud";
import { getStampById, remove, update } from "@/services/stamps";
import { Stamp, StampModel } from "@/data/stamps";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const stamp = await getStampById(id);

  if (!stamp) {
    return NextResponse.json({ error: "Stamp not found" }, { status: 404 });
  }
  return NextResponse.json(stamp);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const stamp: Partial<OmitId<StampModel>> = await req.json();
  const { id } = await params;
  const updatedStamp = await update(id, stamp as Omit<Stamp, "id">);

  if (!updatedStamp) {
    return NextResponse.json({ error: "Stamp not found" }, { status: 404 });
  }
  return NextResponse.json(updatedStamp);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  remove(id);

  return NextResponse.json({ success: true });
}
