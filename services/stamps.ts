"use server";
import isNil from "lodash/isNil";
import { prisma } from "@/lib/prisma";
import { Stamp } from "@/data/stamps";

export const getAllStamps = async (): Promise<Stamp[]> => {
  return await prisma.stamp.findMany();
};

export const getStampById = async (id: string): Promise<Stamp | null> => {
  return await prisma.stamp.findUnique({ where: { id } });
};

export const createStamp = async (stamp: Omit<Stamp, "id">): Promise<void> => {
  await prisma.stamp.create({ data: stamp });
};

export const update = async (id: string, stamp: Omit<Stamp, "id">) => {
  return await prisma.stamp.update({
    where: { id },
    data: stamp,
  });
};

export const remove = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.stamp.delete({ where: { id } });
};
