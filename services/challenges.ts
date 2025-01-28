"use server";
import isNil from "lodash/isNil";
import { prisma } from "@/lib/prisma";
import { Challenge } from "../data/challenges";
import { httpClient } from "@/lib/httpClient";

function parseChallengeForm(
  lessonId: string,
  formData: FormData
): Omit<Challenge, "id"> {
  return {
    lessonId,
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    targetLanguage: formData.get("targetLanguage") as string,
    sourceLanguage: formData.get("sourceLanguage") as string,
    tip: formData.get("tip") as string,
  };
}

export const createChallenge = async (
  lessonId: string,
  formData: FormData
): Promise<void> => {
  const challenge = parseChallengeForm(lessonId, formData);
  await httpClient.POST<Omit<Challenge, "id">>("/challenges", challenge);
};

export const updateChallenge = async (
  id: string,
  lessonId: string,
  formData: FormData
): Promise<void> => {
  const challenge = parseChallengeForm(lessonId, formData);

  if (isNil(id)) {
    throw new Error("Empty id");
  }

  if (!challenge.question || !challenge.answer || !challenge.lessonId) {
    throw new Error("Empty Field");
  }

  await httpClient.PUT<Omit<Challenge, "id">>(`/challenges/${id}`, challenge);
};

export const removeChallenge = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }

  await httpClient.DELETE<Omit<Challenge, "id">>(`/challenges/${id}`);
};

export const getChallengesByLessonId = async (
  lessonId: string
): Promise<Challenge[]> => {
  return await prisma.challenges.findMany({ where: { lessonId } });
};

export const getChallengeById = async (
  id: string
): Promise<Challenge | null> => {
  return await prisma.challenges.findUnique({ where: { id } });
};
