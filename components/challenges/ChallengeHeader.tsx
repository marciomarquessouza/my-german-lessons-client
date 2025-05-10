"use client";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Lesson } from "@/data/lessons";
import { Stack } from "@mui/system";
import { Challenge } from "@/data/challenges";

export interface ChallengeHeaderProps {
  lesson?: Lesson | null;
  challenges: Challenge[];
}

export default function ChallengeHeader({
  lesson,
  challenges,
}: ChallengeHeaderProps) {
  return (
    <Box flexDirection="column">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Box>
          <Typography component="div" sx={{ fontWeight: "bold" }}>
            Description:{" "}
            <Box sx={{ fontWeight: "regular" }} display="inline">
              {lesson?.description}
            </Box>
          </Typography>
        </Box>
        <Box>
          <Typography component="div" sx={{ fontWeight: "bold" }}>
            Total:{" "}
            <Box sx={{ fontWeight: "regular" }} display="inline">
              {challenges?.length || 0}
            </Box>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
