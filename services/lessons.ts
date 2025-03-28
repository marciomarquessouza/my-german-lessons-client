"use server";
import isNil from "lodash/isNil";
import set from "lodash/set";
import get from "lodash/get";
import snakeCase from "lodash/snakeCase";
import { prisma } from "@/lib/prisma";
import { Lesson } from "@/data/lessons";
import { Challenge } from "@/data/challenges";
import { fileServices } from "@/lib/fileServices";

export const createLesson = async (formData: FormData): Promise<void> => {
  const name: string = formData.get("name") as string;
  const slugName = snakeCase(name.toLowerCase());
  const description = formData.get("description") as string;

  if (!name || !description) {
    throw new Error("Empty Field");
  }
  const lesson: Omit<Lesson, "id"> = { name, description, slugName };

  await prisma.lessons.create({ data: lesson });
};

export const updateLesson = async (
  id: string,
  formData: FormData
): Promise<void> => {
  const name: string = formData.get("name") as string;
  const slugName = snakeCase(name.toLowerCase());
  const description = formData.get("description") as string;

  if (isNil(id)) {
    throw new Error("Empty id");
  }

  if (!name || !description) {
    throw new Error("Empty Field");
  }

  const lesson: Omit<Lesson, "id"> = { name, slugName, description };
  await prisma.lessons.update({
    where: { id },
    data: lesson,
  });
};

export const removeLesson = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.lessons.delete({ where: { id } });
};

export const getAllLessons = async (): Promise<Lesson[]> => {
  return await prisma.lessons.findMany();
};

export const getLessonById = async (id: string): Promise<Lesson | null> => {
  return await prisma.lessons.findUnique({ where: { id } });
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
    await fileServices.createDocument(fileName, lessonDocumentString);
    return fileName;
  } catch (error: any) {
    const message = error?.message || error?.msg || "error creating document";
    throw new Error(error);
  }
};
