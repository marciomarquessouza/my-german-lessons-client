"use client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect, useState } from "react";
import { Lesson } from "@/data/lessons";

export interface FormDrawerProps extends React.PropsWithChildren {
  isUpdate?: boolean;
  lessonToUpdate?: Lesson;
}

export default function FormDrawer({
  children,
  isUpdate = false,
}: FormDrawerProps) {
  const [isExpanded, setExpanded] = useState(isUpdate);

  const handleExpanded = (_event: React.SyntheticEvent, expanded: boolean) => {
    setExpanded(expanded);
  };

  useEffect(() => {
    setExpanded(isUpdate);
  }, [isUpdate]);

  return (
    <Accordion elevation={2} expanded={isExpanded} onChange={handleExpanded}>
      <AccordionSummary
        expandIcon={isExpanded ? <RemoveCircleIcon /> : <AddCircleIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="h4">{isUpdate ? "Update" : "Create"}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
