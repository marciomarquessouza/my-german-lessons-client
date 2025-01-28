"use client";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDialogs, useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";
import BasicDialog from "../core/BasicDialog";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { removeLesson } from "@/services/lessons";

export interface LessonActionsProps {
  lessonId: string;
}

export default function LessonActions({ lessonId }: LessonActionsProps) {
  const notifications = useNotifications();
  const router = useRouter();
  const dialog = useDialogs();

  const handleOpenLesson = () => {
    router.push(`/challenges/${lessonId}`);
  };

  const handleEditLesson = () => {
    router.push(`/?updateLessonId=${lessonId}`);
  };

  const handleDeleteClick = async () => {
    try {
      await removeLesson(lessonId);
      notifications.show("Lesson removed", {
        autoHideDuration: 3000,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      notifications.show("Error removing the lesson", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  const confirmationDialog = async (onConfirmation: () => Promise<void>) => {
    await dialog.open(BasicDialog, {
      title: "Confirmation",
      content: "Confirm the remotion of this Lesson?",
      onConfirmation,
    });
  };

  return (
    <Box>
      <IconButton
        aria-label="open"
        size="small"
        color="primary"
        onClick={handleOpenLesson}
      >
        <FileOpenIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="edit"
        size="small"
        color="primary"
        onClick={handleEditLesson}
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
