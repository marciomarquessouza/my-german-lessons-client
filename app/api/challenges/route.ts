"use server";
import isNil from "lodash/isNil";
import { Challenge } from "@/data/challenges";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emptyRequiredFields = [
      "lessonId",
      "sourceLanguage",
      "targetLanguage",
      "question",
      "answer",
    ].filter((key) => isNil(body[key]));

    if (emptyRequiredFields.length > 0) {
      throw new Error(
        `The required fields ${emptyRequiredFields.join("|")} are empty`
      );
    }

    const challenge = body as Challenge;

    await prisma.challenges.create({ data: challenge });

    return Response.json({ message: "New challenged created" });
  } catch (error: any) {
    const errorMessage = error?.message || error?.msg || "Unexpected Error";
    return new Response(errorMessage, {
      status: 400,
    });
  }
}

export async function GET() {
  try {
    const challenges = await prisma.challenges.findMany();
    return Response.json({ challenges });
  } catch (error: any) {
    const errorMessage = error?.message || error?.msg || "Unexpected Error";
    return new Response(errorMessage, {
      status: 400,
    });
  }
}
