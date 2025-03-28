import * as React from "react";
import type { Metadata } from "next";
import { PageContainer } from "@toolpad/core";
import { Box, Paper } from "@mui/material";
import { getLessonById } from "@/services/lessons";
import { getChallengesByLessonId } from "@/services/challenges";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import FormDrawer from "@/components/core/FormDrawer";
import ChallengeForm from "@/components/challenges/ChallengeForm";
import ChallengesList from "@/components/challenges/ChallengesList";

export const metadata: Metadata = {
  title: "LWG - Challenge",
};

export default async function ChallengesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ updateChallengeId?: string }>;
}) {
  const { lessonId } = await params;
  const searchParamsResponse = await searchParams;
  const updateChallengeId = searchParamsResponse?.updateChallengeId;
  const lesson = await getLessonById(lessonId);
  const challenges = !!lesson ? await getChallengesByLessonId(lessonId) : [];

  const challengesToUpdate = challenges?.find(
    (challenge) => challenge?.id === updateChallengeId
  );
  const isUpdate = !!challengesToUpdate;

  const title = `${lesson?.name}`;
  const breadcrumbs = [
    { title: `Lessons`, path: "/" },
    { title: lesson?.slugName || lessonId, path: "/" },
  ];

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <PageContainer title={title} breadcrumbs={breadcrumbs}>
        <ChallengeHeader lesson={lesson} challenges={challenges} />
        <Box marginY="12px">
          <FormDrawer isUpdate={isUpdate}>
            <ChallengeForm
              lessonId={lessonId}
              isUpdate={isUpdate}
              challengeToUpdate={challengesToUpdate}
            />
          </FormDrawer>
        </Box>
        <Box>
          <ChallengesList challenges={challenges} />
        </Box>
      </PageContainer>
    </Paper>
  );
}
