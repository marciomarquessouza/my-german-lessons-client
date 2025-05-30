import { NextRequest, NextResponse } from "next/server";
import type { OmitId } from "@toolpad/core/Crud";
import {
  getChallengeById,
  removeChallenge,
  updateChallenge,
} from "@/services/challenges";
import { Challenge, ChallengeModel } from "@/data/challenges";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await getChallengeById(id);

  if (!item) {
    return NextResponse.json({ error: "Trail not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const item: Partial<OmitId<ChallengeModel>> = await req.json();
  const { id } = await params;
  const updatedItem = await updateChallenge(id, item as Omit<Challenge, "id">);
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  removeChallenge(id);

  return NextResponse.json({ success: true });
}
