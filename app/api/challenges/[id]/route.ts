"use server";
import isNil from "lodash/isNil";
import { Challenge } from "@/data/challenges";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const emptyRequiredFields = [
      "lessonId",
      "sourceLanguage",
      "targetLanguage",
      "question",
      "answer",
    ].filter((key) => isNil(body[key]));
    const id = (await params).id;

    if (!id) {
      throw new Error(`The required fields id is empty`);
    }

    if (emptyRequiredFields.length > 0) {
      throw new Error(
        `The required fields ${emptyRequiredFields.join("|")} are empty`
      );
    }
    const challenge = body as Challenge;

    await prisma.challenges.update({
      where: { id },
      data: challenge,
    });

    return Response.json({ message: "Challenge updated" });
  } catch (error: any) {
    const errorMessage = error?.message || error?.msg || "Unexpected Error";
    return new Response(errorMessage, {
      status: 400,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      throw new Error(`The required fields id is empty`);
    }

    await prisma.challenges.delete({ where: { id } });
    return Response.json({ message: "Challenge removed" });
  } catch (error: any) {
    const errorMessage = error?.message || error?.msg || "Unexpected Error";
    return new Response(errorMessage, {
      status: 400,
    });
  }
}
