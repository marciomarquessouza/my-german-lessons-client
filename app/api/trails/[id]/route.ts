import { NextRequest, NextResponse } from "next/server";
import type { OmitId } from "@toolpad/core/Crud";
import { getTrailById, removeTrail, updateTrail } from "@/services/trails";
import { Trail, TrailModel } from "@/data/trails";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const stamp = await getTrailById(id);

  if (!stamp) {
    return NextResponse.json({ error: "Trail not found" }, { status: 404 });
  }
  return NextResponse.json(stamp);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const trail: Partial<OmitId<TrailModel>> = await req.json();
  const { id } = await params;
  const updatedTrail = await updateTrail(id, trail as Omit<Trail, "id">);

  if (!updatedTrail) {
    return NextResponse.json({ error: "Trail not found" }, { status: 404 });
  }
  return NextResponse.json(updatedTrail);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  removeTrail(id);

  return NextResponse.json({ success: true });
}
