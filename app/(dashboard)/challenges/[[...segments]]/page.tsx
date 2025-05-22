import * as React from "react";
import { ChallengeCrud } from "@/components/challenges/ChallengesCrud";
import { getAllLessons } from "@/services/lessons";

export default async function StampsCrudPage() {
  const lessons = await getAllLessons();
  return <ChallengeCrud lessons={lessons} />;
}
