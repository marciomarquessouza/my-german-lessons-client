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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useNotifications } from "@toolpad/core";
import { useEffect, useState } from "react";
import { Challenge } from "@/data/challenges";
import { createChallenge, updateChallenge } from "@/services/challenges";

export interface ChallengeFormProps {
  challengeToUpdate?: Challenge;
  isUpdate?: boolean;
  lessonId: string;
}

const getDefaultState = (lessonId: string): Challenge => ({
  id: "",
  lessonId,
  sourceLanguage: "en",
  targetLanguage: "de",
  question: "",
  answer: "",
  tip: "",
});

export default function ChallengeForm({
  lessonId,
  challengeToUpdate,
  isUpdate = false,
}: ChallengeFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { pending } = useFormStatus();
  const notifications = useNotifications();
  const [challenge, setChallenge] = useState<Challenge>(
    isUpdate && !!challengeToUpdate
      ? challengeToUpdate
      : getDefaultState(lessonId)
  );

  const handleSelectChange = (event: SelectChangeEvent) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setChallenge((state) => ({ ...state, [inputName]: inputValue }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputName = event.currentTarget.name;
    const inputValue = event.currentTarget.value;
    setChallenge((state) => ({ ...state, [inputName]: inputValue }));
  };

  const handleSubmit = async (formdata: FormData) => {
    try {
      isUpdate && !!challenge
        ? await updateChallenge(challenge.id, lessonId, formdata)
        : await createChallenge(lessonId, formdata);
      const message = isUpdate ? "Challenge Updated" : "Challenge Created";
      notifications.show(message, {
        autoHideDuration: 3000,
        severity: "success",
      });
      setChallenge(getDefaultState(lessonId));
      router.refresh();
      isUpdate && router.push(pathname);
    } catch (error) {
      console.error(error);
      notifications.show("Error to create/update lesson", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  const cancelUpdate = () => {
    setChallenge(getDefaultState(lessonId));
    isUpdate && router.push(pathname);
  };

  useEffect(() => {
    if (isUpdate) {
      setChallenge(challengeToUpdate || getDefaultState(lessonId));
    } else {
      setChallenge(getDefaultState(lessonId));
    }
  }, [isUpdate, challengeToUpdate, lessonId]);

  return (
    <Box sx={{ flexGrow: 1 }} component="form" action={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="question">Question</InputLabel>
            <OutlinedInput
              id="question"
              name="question"
              label="Question"
              onChange={handleInputChange}
              value={challenge?.question || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="answer">Answer</InputLabel>
            <OutlinedInput
              id="answer"
              name="answer"
              label="Answer"
              onChange={handleInputChange}
              value={challenge?.answer || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="tip">Tip</InputLabel>
            <OutlinedInput
              id="tip"
              name="tip"
              label="tip"
              onChange={handleInputChange}
              value={challenge?.tip || ""}
            />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="sourceLanguage">Source Language</InputLabel>
            <Select
              labelId="sourceLanguage"
              id="sourceLanguage"
              name="sourceLanguage"
              value={challenge?.sourceLanguage || ""}
              label="Source Language"
              onChange={handleSelectChange}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"us"}>Portuguese</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="targetLanguage">Target Language</InputLabel>
            <Select
              labelId="targetLanguage"
              id="targetLanguage"
              name="targetLanguage"
              value={challenge?.targetLanguage || ""}
              label="Target Language"
              onChange={handleSelectChange}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"us"}>Portuguese</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
