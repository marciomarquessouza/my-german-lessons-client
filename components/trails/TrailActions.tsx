"use client";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDialogs, useNotifications } from "@toolpad/core";
import { useRouter } from "next/navigation";
import BasicDialog from "../core/BasicDialog";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useCallback, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Trail } from "@/data/trails";
import { createJsonFile, removeTrail } from "@/services/trails";
import { getLessonsByTrailId } from "@/services/lessons";

export interface TrailActionsProps {
  trail: Trail;
}

export default function TrailActions({ trail }: TrailActionsProps) {
  const [loading, setLoading] = useState({ action: "", isLoading: false });
  const notifications = useNotifications();
  const router = useRouter();
  const dialog = useDialogs();

  const handleOpen = () => {
    router.push(`/lessons/${trail.id}`);
  };

  const handleEdit = () => {
    router.push(`/?updateTrailId=${trail.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      setLoading({ action: "delete", isLoading: true });
      await removeTrail(trail.id);
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
      const lessons = await getLessonsByTrailId(trail.id);
      const response = await createJsonFile(trail, lessons);
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
  }, [trail, notifications]);

  const confirmationDialog = async (onConfirmation: () => Promise<void>) => {
    await dialog.open(BasicDialog, {
      title: "Confirmation",
      content: "Confirm the remotion of this Trail?",
      onConfirmation,
    });
  };

  return (
    <Box>
      <IconButton
        aria-label="open"
        size="small"
        color="primary"
        onClick={handleOpen}
      >
        <FileOpenIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="edit"
        size="small"
        color="primary"
        onClick={handleEdit}
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
