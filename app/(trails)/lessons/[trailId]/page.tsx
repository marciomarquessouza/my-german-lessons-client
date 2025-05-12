import React from "react";
import type { Metadata } from "next";
import { Box, Paper } from "@mui/material";
import LessonsList from "@/components/lessons/LessonsList";
import FormDrawer from "@/components/core/FormDrawer";
import LessonForm from "@/components/lessons/LessonForm";
import { getAllLessons, getLessonsByTrailId } from "@/services/lessons";
import { getAllTrails, getTrailById } from "@/services/trails";
import { Breadcrumb, PageContainer } from "@toolpad/core";

export const metadata: Metadata = {
  title: "Learning With Ghosts",
};

export default async function LessonsPage({
  params,
  searchParams,
}: {
  params: Promise<{ trailId: string }>;
  searchParams: Promise<{ updateLessonId?: string }>;
}) {
  const { trailId } = await params;
  const trail = await getTrailById(trailId);
  const trails = await getAllTrails();
  const showAll = trailId === "all";
  const lessons = showAll
    ? await getAllLessons()
    : await getLessonsByTrailId(trailId);
  const { updateLessonId } = await searchParams;
  const lessonToUpdate = lessons?.find(
    (lesson) => lesson?.id === updateLessonId
  );
  const isUpdate = !!lessonToUpdate;

  const title = `${trail?.title}`;
  const breadcrumbs = [
    { title: `Trail`, path: `/` },
    { title: trail?.name || "" },
  ];

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <PageContainerHOC
        title={title}
        breadcrumbs={breadcrumbs}
        showAll={showAll}
      >
        <Box my="12px">
          <FormDrawer isUpdate={isUpdate}>
            <LessonForm
              trailId={trailId}
              trails={trails}
              isUpdate={isUpdate}
              lessonToUpdate={lessonToUpdate}
            />
          </FormDrawer>
        </Box>
        <LessonsList lessons={lessons} />
      </PageContainerHOC>
    </Paper>
  );
}

interface PageContainerHOCProps extends React.PropsWithChildren {
  showAll: boolean;
  title: string;
  breadcrumbs?: Breadcrumb[] | undefined;
}

const PageContainerHOC = ({
  showAll,
  children,
  title,
  breadcrumbs,
}: PageContainerHOCProps) => {
  return showAll ? (
    <>{children}</>
  ) : (
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
      {children}
    </PageContainer>
  );
};
