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
import { useEffect, useState } from "react";
import { Trail } from "@/data/trails";
import { createTrail, updateTrail } from "@/services/trails";

export interface TrailFormProps {
  trailToUpdate?: Trail;
  isUpdate?: boolean;
}

const defaultState: Trail = {
  id: "",
  name: "",
  slugName: "",
  title: "",
  rooms: 0,
  floors: 0,
};

export default function TrailForm({
  trailToUpdate,
  isUpdate = false,
}: TrailFormProps) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const notifications = useNotifications();
  const [trail, setTrail] = useState<Trail>(
    isUpdate && !!trailToUpdate ? trailToUpdate : defaultState
  );

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputName = event.currentTarget.name;
    const inputValue = event.currentTarget.value;
    setTrail((state) => ({ ...state, [inputName]: inputValue }));
  };

  const handleSubmit = async (formdata: FormData) => {
    try {
      isUpdate && !!trail
        ? await updateTrail(trail.id, formdata)
        : await createTrail(formdata);
      const message = isUpdate ? "Trail Updated" : "Trail Created";
      notifications.show(message, {
        autoHideDuration: 3000,
        severity: "success",
      });
      setTrail(defaultState);
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
    setTrail(defaultState);
    isUpdate && router.push("/");
  };

  useEffect(() => {
    if (isUpdate) {
      setTrail(trailToUpdate || defaultState);
    } else {
      setTrail(defaultState);
    }
  }, [isUpdate, trailToUpdate]);

  return (
    <Box sx={{ flexGrow: 1 }} component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="trail-name">Name</InputLabel>
            <OutlinedInput
              id="trail-name"
              name="name"
              label="Name"
              onChange={handleOnChange}
              value={trail?.name || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={5}>
          <FormControl fullWidth>
            <InputLabel htmlFor="trail-title">Title</InputLabel>
            <OutlinedInput
              id="trail-title"
              name="title"
              label="Title"
              onChange={handleOnChange}
              value={trail?.title || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="trail-rooms">Rooms</InputLabel>
            <OutlinedInput
              id="trail-rooms"
              name="rooms"
              label="Rooms"
              type="number"
              onChange={handleOnChange}
              value={trail?.rooms || 0}
            />
          </FormControl>
        </Grid>
        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="trail-floors">Floors</InputLabel>
            <OutlinedInput
              id="trail-floors"
              name="floors"
              label="Floors"
              type="number"
              onChange={handleOnChange}
              value={trail?.floors || 0}
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
