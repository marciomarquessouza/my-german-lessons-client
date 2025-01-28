import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Lesson } from "@/data/lessons";

export interface ChallengeHeaderProps {
  lesson?: Lesson | null;
}

export default function ChallengeHeader({ lesson }: ChallengeHeaderProps) {
  return (
    <Box flex="column">
      <Typography component="div" sx={{ fontWeight: "bold" }}>
        Description:{" "}
        <Box sx={{ fontWeight: "regular" }} display="inline">
          {lesson?.description}
        </Box>
      </Typography>
    </Box>
  );
}
