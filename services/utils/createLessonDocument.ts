import { Challenge } from "@/data/challenges";
import { Lesson } from "@/data/lessons";

export const createLessonDocument = (
  lesson: Lesson,
  challenges: Challenge[]
) => {
  return {
    ...lesson,
    challenges,
  };
};
