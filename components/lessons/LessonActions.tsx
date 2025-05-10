"use client";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDialogs, useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";
import BasicDialog from "../core/BasicDialog";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { removeLesson } from "@/services/lessons";
import { useCallback, useState } from "react";
import { Lesson } from "@/data/lessons";
import { createJsonFile, getChallengesByLessonId } from "@/services/challenges";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export interface LessonActionsProps {
  lesson: Lesson;
}

export default function LessonActions({ lesson }: LessonActionsProps) {
  const [loading, setLoading] = useState({ action: "", isLoading: false });
  const notifications = useNotifications();
  const router = useRouter();
  const dialog = useDialogs();

  const handleOpenLesson = () => {
    router.push(`/challenges/${lesson.id}`);
  };

  const handleEditLesson = () => {
    router.push(`/?updateLessonId=${lesson.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      setLoading({ action: "delete", isLoading: true });
      await removeLesson(lesson.id);
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
    } finally {
      setLoading({ action: "delete", isLoading: false });
    }
  };

  const handleExportJson = useCallback(async () => {
    try {
      setLoading({ action: "export", isLoading: true });
      const challenges = await getChallengesByLessonId(lesson.id);
      const response = await createJsonFile(lesson, challenges);
      if (response.status === 200) {
        notifications.show(`File Create: ${response.message}`, {
          autoHideDuration: 3000,
          severity: "success",
        });
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      notifications.show("Error to create a new file", {
        autoHideDuration: 3000,
        severity: "error",
      });
    } finally {
      setLoading({ action: "export", isLoading: false });
    }
  }, [lesson, notifications]);

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
        aria-label="export"
        size="small"
        color="primary"
        loading={loading.action === "export" && loading.isLoading}
        onClick={handleExportJson}
      >
        <FileUploadIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        loading={loading.action === "delete" && loading.isLoading}
        onClick={() => confirmationDialog(handleDeleteClick)}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
