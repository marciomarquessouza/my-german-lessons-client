"use server";
import set from "lodash/set";
import get from "lodash/get";
import isNil from "lodash/isNil";
import { Trail } from "@/data/trails";
import { prisma } from "@/lib/prisma";
import snakeCase from "lodash/snakeCase";
import { Lesson } from "@/data/lessons";
import { fileServices } from "@/lib/fileServices";
import { GODOT_TRAILS_PATH } from "@/constants/services";

export const createTrail = async (formData: FormData): Promise<void> => {
  const name: string = formData.get("name") as string;
  const slugName = snakeCase(name.toLowerCase());
  const title: string = formData.get("title") as string;

  if (!name || !title) {
    throw new Error("Empty Field");
  }

  const trail: Omit<Trail, "id"> = {
    name,
    slugName,
    title,
    lessonsQnt: 0,
  };

  await prisma.trails.create({ data: trail });
};

export const updateTrail = async (id: string, formData: FormData) => {
  const name: string = formData.get("name") as string;
  const slugName = snakeCase(name.toLowerCase());
  const title: string = formData.get("title") as string;

  if (isNil(id)) {
    throw new Error("Empty id");
  }

  if (!name || !title) {
    throw new Error("Empty Field");
  }

  const trail: Omit<Trail, "id"> = {
    name,
    slugName,
    title,
    lessonsQnt: 0,
  };

  await prisma.lessons.update({
    where: { id },
    data: trail,
  });
};

export const removeTrail = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.trails.delete({ where: { id } });
};

export const getAllTrails = async (): Promise<Trail[]> => {
  return await prisma.trails.findMany();
};

export const getTrailById = async (id: string): Promise<Trail | null> => {
  return await prisma.trails.findUnique({ where: { id } });
};

export const exportJSONTrailDocument = async (
  trail: Trail,
  lessons: Lesson[]
): Promise<string> => {
  try {
    if (isNil(trail) || isNil(lessons)) {
      throw new Error(" Missing Lesson and/or Trail");
    }

    const trailConverted = {};

    Object.keys(trail).forEach((key: any) => {
      set(trailConverted, snakeCase(key), get(trail, key));
    });

    const lessonsConverted = lessons.map((lesson) => {
      const lessonConverted = {};
      Object.keys(lesson).forEach((key) => {
        set(lessonConverted, snakeCase(key), get(lesson, key));
      });
      return lessonConverted;
    });

    const trailDocument = {
      ...trailConverted,
      lessons: lessonsConverted,
    };

    const trailDocumentString = JSON.stringify(trailDocument);
    const fileName = snakeCase(trail.name.toLowerCase()) + ".json";
    await fileServices.createDocument(
      GODOT_TRAILS_PATH,
      fileName,
      trailDocumentString
    );
    return fileName;
  } catch (error: any) {
    const message = error?.message || error?.msg || "error creating document";
    throw new Error(error);
  }
};
