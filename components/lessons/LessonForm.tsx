"use client";
import { useFormStatus } from "react-dom";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/system/Grid";
import { useRouter } from "next/navigation";
import { useNotifications } from "@toolpad/core";
import { Lesson } from "@/data/lessons";
import { useEffect, useState } from "react";
import { createLesson, updateLesson } from "@/services/lessons";

export interface LessonFormProps {
  lessonToUpdate?: Lesson;
  isUpdate?: boolean;
}

const defaultState: Lesson = {
  id: "",
  name: "",
  slugName: "",
  description: "",
};

export default function LessonForm({
  lessonToUpdate,
  isUpdate = false,
}: LessonFormProps) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const notifications = useNotifications();
  const [lesson, setLesson] = useState<Lesson>(
    isUpdate && !!lessonToUpdate ? lessonToUpdate : defaultState
  );

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputName = event.currentTarget.name;
    const inputValue = event.currentTarget.value;
    setLesson((state) => ({ ...state, [inputName]: inputValue }));
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
      isUpdate && router.push("/");
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
    isUpdate && router.push("/");
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
