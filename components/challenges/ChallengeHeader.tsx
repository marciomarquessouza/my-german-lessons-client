"use client";
import Grid from "@mui/system/Grid";
import Typography from "@mui/material/Typography";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Box, Button } from "@mui/material";
import { Lesson } from "@/data/lessons";
import { Stack } from "@mui/system";
import { Challenge } from "@/data/challenges";
import { createJsonFile } from "@/services/challenges";
import { useCallback } from "react";
import { useNotifications } from "@toolpad/core";

export interface ChallengeHeaderProps {
  lesson?: Lesson | null;
  challenges: Challenge[];
}

export default function ChallengeHeader({
  lesson,
  challenges,
}: ChallengeHeaderProps) {
  const notifications = useNotifications();

  const handleExportJson = useCallback(async () => {
    const response = await createJsonFile(lesson, challenges);
    if (response.status === 200) {
      notifications.show(`File Create: ${response.message}`, {
        autoHideDuration: 3000,
        severity: "success",
      });
    } else {
      notifications.show("Error to create a new file", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  }, [lesson, challenges, notifications]);

  return (
    <Box sx={{ flexGrow: 1 }} flex="column">
      <Grid container spacing={2}>
        <Grid size={10}>
          <Typography component="div" sx={{ fontWeight: "bold" }}>
            Description:{" "}
            <Box sx={{ fontWeight: "regular" }} display="inline">
              {lesson?.description}
            </Box>
          </Typography>
          <Typography component="div" sx={{ fontWeight: "bold" }}>
            Total:{" "}
            <Box sx={{ fontWeight: "regular" }} display="inline">
              {challenges?.length || 0}
            </Box>
          </Typography>
        </Grid>
        <Grid size={2} alignItems="end">
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileCopyIcon fontSize="inherit" />}
              onClick={handleExportJson}
            >
              Export to Godot
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
