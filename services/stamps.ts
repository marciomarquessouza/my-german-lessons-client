"use server";
import isNil from "lodash/isNil";
import { prisma } from "@/lib/prisma";
import { Stamp } from "@/data/stamps";

export const getAllStamps = async (): Promise<Stamp[]> => {
  return await prisma.stamps.findMany();
};

export const getStampById = async (id: string): Promise<Stamp | null> => {
  return await prisma.stamps.findUnique({ where: { id } });
};

export const createStamp = async (stamp: Omit<Stamp, "id">): Promise<void> => {
  const newStamp: Omit<Stamp, "id"> = {
    title: stamp.title,
    description: stamp.description,
    type: stamp.type,
    class: stamp.class,
  };
  await prisma.stamps.create({ data: newStamp });
};

export const update = async (id: string, stamp: Omit<Stamp, "id">) => {
  return await prisma.trails.update({
    where: { id },
    data: stamp,
  });
};

export const remove = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.trails.delete({ where: { id } });
};
