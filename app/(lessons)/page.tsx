import React from "react";
import type { Metadata } from "next";
import { Box, Paper } from "@mui/material";
import LessonsList from "@/components/lessons/LessonsList";
import FormDrawer from "@/components/core/FormDrawer";
import LessonForm from "@/components/lessons/LessonForm";
import { getAllLessons } from "@/services/lessons";

export const metadata: Metadata = {
  title: "Learning With Ghosts",
};

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ updateLessonId?: string }>;
}) {
  const lessons = await getAllLessons();
  const params = await searchParams;
  const updateLessonId = params?.updateLessonId;
  const lessonToUpdate = lessons?.find(
    (lesson) => lesson?.id === updateLessonId
  );
  const isUpdate = !!lessonToUpdate;

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Box my="12px">
        <FormDrawer isUpdate={isUpdate}>
          <LessonForm isUpdate={isUpdate} lessonToUpdate={lessonToUpdate} />
        </FormDrawer>
      </Box>
      <LessonsList lessons={lessons} />
    </Paper>
  );
}
