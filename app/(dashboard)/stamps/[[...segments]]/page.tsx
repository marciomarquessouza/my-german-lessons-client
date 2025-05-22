import * as React from "react";
import { StampCrud } from "@/components/stamps/StampCrud";
import { getAllLessons } from "@/services/lessons";

export default async function StampsCrudPage() {
  const lessons = await getAllLessons();
  return <StampCrud lessons={lessons} />;
}
