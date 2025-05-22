"use server";
import isNil from "lodash/isNil";
import { prisma } from "@/lib/prisma";
import { Challenge } from "../data/challenges";

export const createChallenge = async (challenge: Omit<Challenge, "id">) => {
  const newChallenge: Omit<Challenge, "id"> = {
    lessonId: challenge.lessonId,
    sourceLanguage: challenge.sourceLanguage,
    targetLanguage: challenge.targetLanguage,
    question: challenge.question,
    answer: challenge.answer,
    tip: challenge.tip || "",
  };
  return await prisma.challenge.create({ data: newChallenge });
};

export const updateChallenge = async (
  id: string,
  challengeData: Omit<Challenge, "id">
) => {
  return await prisma.challenge.update({
    where: { id },
    data: challengeData,
  });
};

export const removeChallenge = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.challenge.delete({ where: { id } });
};

export const getAllChallenges = async (): Promise<Challenge[]> => {
  return await prisma.challenge.findMany();
};

export const getChallengeById = async (
  id: string
): Promise<Challenge | null> => {
  return await prisma.challenge.findUnique({ where: { id } });
};
