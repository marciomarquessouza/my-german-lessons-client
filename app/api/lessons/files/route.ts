"use server";
import get from "lodash/get";
import { Challenge } from "@/data/challenges";
import { Lesson } from "@/data/lessons";
import { exportJSONLessonDocument } from "@/services/lessons";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lesson = get(body, "lesson", {}) as Lesson;
    const challenges = get(body, "challenges", []) as Challenge[];

    const fileName = await exportJSONLessonDocument(lesson, challenges);

    console.log("New file created: ", fileName);
    return Response.json({ message: fileName });
  } catch (error) {}
}
