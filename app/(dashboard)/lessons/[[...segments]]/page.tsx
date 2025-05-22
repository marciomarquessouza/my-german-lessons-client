import * as React from "react";
import { getAllTrails } from "@/services/trails";
import { LessonCrud } from "@/components/lessons/LessonsCrud";

export default async function LessonsCrudPage() {
  const trails = await getAllTrails();
  return <LessonCrud trails={trails} />;
}
