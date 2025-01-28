"use client";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDialogs, useNotifications } from "@toolpad/core";
import { usePathname, useRouter } from "next/navigation";
import BasicDialog from "../core/BasicDialog";
import { removeChallenge } from "@/services/challenges";

export interface ChallengesActionsProps {
  challengeId: string;
}

export default function ChallengesActions({
  challengeId,
}: ChallengesActionsProps) {
  const notifications = useNotifications();
  const router = useRouter();
  const dialog = useDialogs();
  const pathname = usePathname();

  const handleEditChallenge = () => {
    router.push(`${pathname}?updateChallengeId=${challengeId}`);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await removeChallenge(challengeId);
      notifications.show("Challenge removed", {
        autoHideDuration: 3000,
      });
      router.refresh();
    } catch (error) {
      notifications.show("Error removing the challenge", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  const confirmationDialog = async (onConfirmation: () => Promise<void>) => {
    await dialog.open(BasicDialog, {
      title: "Confirmation",
      content: "Confirm the remotion of this Challenge?",
      onConfirmation,
    });
  };

  return (
    <Box>
      <IconButton
        aria-label="edit"
        size="small"
        color="primary"
        onClick={handleEditChallenge}
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        onClick={() => confirmationDialog(handleDeleteClick)}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
