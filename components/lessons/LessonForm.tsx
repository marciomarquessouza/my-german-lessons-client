"use client";
import { useFormStatus } from "react-dom";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/system/Grid";
import { usePathname, useRouter } from "next/navigation";
import { useNotifications } from "@toolpad/core";
import { Lesson } from "@/data/lessons";
import { useEffect, useState } from "react";
import { createLesson, updateLesson } from "@/services/lessons";
import DownloadIcon from "@mui/icons-material/Download";
import { Trail } from "@/data/trails";

export interface LessonFormProps {
  trailId: string;
  trails: Trail[];
  lessonToUpdate?: Lesson;
  isUpdate?: boolean;
}

const defaultState: Lesson = {
  trailId: "",
  id: "",
  name: "",
  slugName: "",
  description: "",
  doorTitle: "",
  roomPosition: 0,
  floorPosition: 0,
};

export default function LessonForm({
  trailId,
  trails,
  lessonToUpdate,
  isUpdate = false,
}: LessonFormProps) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const notifications = useNotifications();
  const [lesson, setLesson] = useState<Lesson>(
    isUpdate && !!lessonToUpdate ? lessonToUpdate : defaultState
  );
  const pathname = usePathname();

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputName = event.currentTarget.name;
    const inputValue = event.currentTarget.value;
    setLesson((state) => ({ ...state, [inputName]: inputValue }));
  };

  const handleOnSelect = (event: SelectChangeEvent<unknown>) => {
    const selectName = event.target.name;
    const selectValue = event.target.value;
    setLesson((state) => ({ ...state, [selectName]: selectValue }));
  };

  const handleFillDoorTitle = () => {
    setLesson((state) => ({ ...state, doorTitle: state.name }));
  };

  const handleSubmit = async (formdata: FormData) => {
    try {
      isUpdate && !!lesson
        ? await updateLesson(lesson.id, formdata)
        : await createLesson(formdata);
      const message = isUpdate ? "Lesson Updated" : "Lesson Created";
      notifications.show(message, {
        autoHideDuration: 3000,
        severity: "success",
      });
      setLesson(defaultState);
      router.refresh();
      isUpdate && router.push(pathname);
    } catch (error) {
      console.log(error);
      notifications.show("error to create/update", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  const cancelUpdate = () => {
    setLesson(defaultState);
    isUpdate && router.push(pathname);
  };

  useEffect(() => {
    if (isUpdate) {
      setLesson(lessonToUpdate || defaultState);
    } else {
      setLesson(defaultState);
    }
  }, [isUpdate, lessonToUpdate]);

  return (
    <Box sx={{ flexGrow: 1 }} component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="lesson-name">Name</InputLabel>
            <OutlinedInput
              id="lesson-name"
              name="name"
              label="Name"
              onChange={handleOnChange}
              value={lesson?.name || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={8}>
          <FormControl fullWidth>
            <InputLabel htmlFor="lesson-description">Description</InputLabel>
            <OutlinedInput
              id="lesson-description"
              name="description"
              label="Description"
              onChange={handleOnChange}
              value={lesson?.description || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="lesson-roomPosition">Room Position</InputLabel>
            <OutlinedInput
              id="lesson-roomPosition"
              name="roomPosition"
              label="Room Position"
              type="number"
              onChange={handleOnChange}
              value={lesson?.roomPosition || 0}
            />
          </FormControl>
        </Grid>
        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="lesson-floorPosition">
              Floor Position
            </InputLabel>
            <OutlinedInput
              id="lesson-floorPosition"
              name="floorPosition"
              label="Floor Position"
              type="number"
              onChange={handleOnChange}
              value={lesson?.floorPosition || 0}
            />
          </FormControl>
        </Grid>
        <Grid size={5}>
          <FormControl fullWidth>
            <InputLabel htmlFor="lesson-doorTitle">Door Title</InputLabel>
            <OutlinedInput
              id="lesson-doorTitle"
              name="doorTitle"
              label="Door Title"
              onChange={handleOnChange}
              value={lesson?.doorTitle || ""}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="copy-name"
                    onClick={handleFillDoorTitle}
                  >
                    <DownloadIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid size={3}>
          <FormControl fullWidth>
            <InputLabel id="lesson-trail">Trail</InputLabel>
            <Select
              labelId="lesson-trail"
              id="lesson-trail"
              name="trailId"
              value={trailId || trails[0]?.id || ""}
              onChange={handleOnSelect}
              autoWidth
              label="Trail"
            >
              {trails.map((trail) => (
                <MenuItem key={trail.id} value={trail.id}>
                  {`${trail.name} - ${trail.title}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Box display="block" mt="12px">
            <Box display="inline">
              <Button type="submit" variant="contained" disabled={pending}>
                {isUpdate ? "Update" : "Add"}
              </Button>
              {isUpdate && (
                <Button
                  type="reset"
                  variant="contained"
                  disabled={pending}
                  sx={{ mx: "12px" }}
                  onClick={cancelUpdate}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
