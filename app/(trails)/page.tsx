import React from "react";
import type { Metadata } from "next";
import { Box, Paper } from "@mui/material";
import FormDrawer from "@/components/core/FormDrawer";
import { getAllTrails } from "@/services/trails";
import TrailForm from "@/components/trails/TrailForm";
import TrailList from "@/components/trails/TrailsList";

export const metadata: Metadata = {
  title: "Learning With Ghosts",
};

export default async function TrailPage({
  searchParams,
}: {
  searchParams: Promise<{ updateTrailId?: string }>;
}) {
  const trails = await getAllTrails();
  const params = await searchParams;
  const updateTrailId = params?.updateTrailId;
  const trailToUpdate = trails?.find((trail) => trail?.id === updateTrailId);
  const isUpdate = !!trailToUpdate;

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Box my="12px">
        <FormDrawer isUpdate={isUpdate}>
          <TrailForm isUpdate={isUpdate} trailToUpdate={trailToUpdate} />
        </FormDrawer>
      </Box>
      <TrailList trails={trails} />
    </Paper>
  );
}
