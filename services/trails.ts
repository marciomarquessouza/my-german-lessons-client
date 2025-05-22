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
import { httpClient } from "@/lib/httpClient";
import camelCase from "lodash/camelCase";

export const createTrail = async (trail: Omit<Trail, "id">) => {
  const newTrail: Omit<Trail, "id"> = {
    name: trail.name,
    slugName: camelCase(trail.name),
    title: trail.title,
    rooms: trail.rooms,
    floors: trail.floors,
  };
  return await prisma.trail.create({ data: newTrail });
};

export const updateTrail = async (id: string, trail: Omit<Trail, "id">) => {
  return await prisma.trail.update({
    where: { id },
    data: trail,
  });
};

export const removeTrail = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.trail.delete({ where: { id } });
};

export const getAllTrails = async (): Promise<Trail[]> => {
  return await prisma.trail.findMany();
};

export const getTrailsValueOptions = async () => {
  const trails = await prisma.trail.findMany();
  return trails.map((trail) => ({
    value: trail.id,
    label: trail.name,
  }));
};

export const getTrailById = async (id: string): Promise<Trail | null> => {
  return await prisma.trail.findUnique({ where: { id } });
};

export const createJsonFile = async (trail: Trail, lessons: Lesson[]) => {
  if (isNil(trail) || isNil(lessons)) {
    throw new Error(" Missing Lesson and Challenges");
  }

  return await httpClient.POST("/trails/files", {
    trail,
    lessons,
  });
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
    throw new Error(message);
  }
};
