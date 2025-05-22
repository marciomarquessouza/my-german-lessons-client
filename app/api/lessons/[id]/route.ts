import { NextRequest, NextResponse } from "next/server";
import type { OmitId } from "@toolpad/core/Crud";
import { getLessonById, removeLesson, updateLesson } from "@/services/lessons";
import { Lesson, LessonModel } from "@/data/lessons";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await getLessonById(id);

  if (!item) {
    return NextResponse.json({ error: "Trail not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const lesson: Partial<OmitId<LessonModel>> = await req.json();
  const { id } = await params;
  const updatedItem = await updateLesson(id, lesson as Omit<Lesson, "id">);
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  removeLesson(id);

  return NextResponse.json({ success: true });
}
