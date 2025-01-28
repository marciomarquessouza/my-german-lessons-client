import * as React from "react";
import { PageContainer } from "@toolpad/core";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import FormDrawer from "@/components/core/FormDrawer";
import ChallengeForm from "@/components/challenges/ChallengeForm";
import { Box } from "@mui/material";
import ChallengesList from "@/components/challenges/ChallengesList";
import { getLessonById } from "@/services/lessons";
import {
  createChallenge,
  getChallengesByLessonId,
} from "@/services/challenges";

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

  const title = lesson?.name || "";
  const breadcrumbs = [
    { title: `Lessons`, path: "/" },
    { title: `${lessonId}`, path: "/" },
  ];

  return (
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
      <ChallengeHeader lesson={lesson} />
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
  );
}
