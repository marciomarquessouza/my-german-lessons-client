"use server";
import isNil from "lodash/isNil";
import set from "lodash/set";
import get from "lodash/get";
import snakeCase from "lodash/snakeCase";
import { prisma } from "@/lib/prisma";
import { Lesson } from "@/data/lessons";
import { Challenge } from "@/data/challenges";
import { fileServices } from "@/lib/fileServices";
import { GODOT_LESSONS_PATH } from "@/constants/services";
import camelCase from "lodash/camelCase";

export const createLesson = async (lesson: Omit<Lesson, "id">) => {
  const newLesson: Omit<Lesson, "id"> = {
    name: lesson.name,
    slugName: camelCase(lesson.name),
    description: lesson.description,
    doorTitle: lesson.doorTitle,
    roomPosition: lesson.roomPosition,
    floorPosition: lesson.floorPosition,
    trailId: lesson.trailId,
  };
  return await prisma.lesson.create({ data: newLesson });
};

export const updateLesson = async (
  id: string,
  lessonData: Omit<Lesson, "id">
) => {
  return await prisma.lesson.update({
    where: { id },
    data: lessonData,
  });
};

export const removeLesson = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.lesson.delete({ where: { id } });
};

export const getAllLessons = async (): Promise<Lesson[]> => {
  return await prisma.lesson.findMany();
};

export const getLessonById = async (id: string): Promise<Lesson | null> => {
  return await prisma.lesson.findUnique({ where: { id } });
};

export const getLessonsByTrailId = async (
  trailId: string
): Promise<Lesson[]> => {
  return await prisma.lesson.findMany({ where: { trailId } });
};

export const exportJSONLessonDocument = async (
  lesson?: Lesson | null,
  challenges?: Challenge[]
): Promise<string> => {
  try {
    if (isNil(lesson) || isNil(challenges)) {
      throw new Error(" Missing Lesson and Challenges");
    }

    const lessonsConverted = {};

    Object.keys(lesson).forEach((key: any) => {
      set(lessonsConverted, snakeCase(key), get(lesson, key));
    });

    const challengesConverted = challenges.map((challenge) => {
      const challengeConverted = {};
      Object.keys(challenge).forEach((key) => {
        set(challengeConverted, snakeCase(key), get(challenge, key));
      });
      return challengeConverted;
    });

    const lessonDocument = {
      ...lessonsConverted,
      challenges: challengesConverted,
    };

    const lessonDocumentString = JSON.stringify(lessonDocument);
    const fileName = snakeCase(lesson.name.toLowerCase()) + ".json";
    await fileServices.createDocument(
      GODOT_LESSONS_PATH,
      fileName,
      lessonDocumentString
    );
    return fileName;
  } catch (error: any) {
    const message = error?.message || error?.msg || "error creating document";
    throw new Error(error);
  }
};
