"use server";
import isNil from "lodash/isNil";
import { prisma } from "@/lib/prisma";
import { Lesson } from "../data/lessons";

export const createLesson = async (formData: FormData): Promise<void> => {
  const name: string = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name || !description) {
    throw new Error("Empty Field");
  }
  const lesson: Omit<Lesson, "id"> = { name, description };

  await prisma.lessons.create({ data: lesson });
};

export const updateLesson = async (
  id: string,
  formData: FormData
): Promise<void> => {
  const name: string = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (isNil(id)) {
    throw new Error("Empty id");
  }

  if (!name || !description) {
    throw new Error("Empty Field");
  }

  const lesson: Omit<Lesson, "id"> = { name, description };
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
