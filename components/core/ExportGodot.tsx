"use client";
import { useCallback } from "react";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { createJsonFile } from "@/services/challenges";
import { Lesson } from "@/data/lessons";
import { Challenge } from "@/data/challenges";
import { useNotifications } from "@toolpad/core";

export interface ExportGodotProps {
  lesson?: Lesson | null;
  challenges: Challenge[];
}

export default function ExportGodot({ lesson, challenges }: ExportGodotProps) {
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
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 32, right: 24 }}
        icon={<SpeedDialIcon />}
      >
        {[
          {
            name: "Export",
            icon: <FileUploadIcon />,
            onClick: handleExportJson,
          },
        ].map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
