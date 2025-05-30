"use client";
import { LANGUAGES } from "@/constants/languages";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { z } from "zod";

export interface Challenge {
  id: string;
  lessonId: string;
  sourceLanguage: string;
  targetLanguage: string;
  question: string;
  answer: string;
  tip: string;
}

export type ChallengeModel = Challenge & DataModel;

const API_URL = "/api/challenges";

export const challengesDataSource: DataSource<ChallengeModel> = {
  fields: [
    {
      field: "sourceLanguage",
      headerName: "Source",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      valueOptions: LANGUAGES,
    },
    {
      field: "targetLanguage",
      headerName: "Target",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      valueOptions: LANGUAGES,
    },
    { field: "question", headerName: "Question", width: 250 },
    { field: "answer", headerName: "Answer", width: 250 },
    {
      field: "lessonId",
      headerName: "Lesson",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      width: 200,
    },
  ],
  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", paginationModel.page.toString());
    queryParams.append("pageSize", paginationModel.pageSize.toString());
    if (sortModel?.length) {
      queryParams.append("sort", JSON.stringify(sortModel));
    }
    if (filterModel?.items?.length) {
      queryParams.append("filter", JSON.stringify(filterModel.items));
    }

    const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: "GET",
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  getOne: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  createOne: async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  updateOne: async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();
    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  deleteOne: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  validate: z.object({
    question: z
      .string({ required_error: "title is required" })
      .nonempty("question is required"),
    answer: z
      .string({ required_error: "answer is required" })
      .nonempty("answer is required"),
  })["~standard"].validate,
};

export const challengesCache = new DataSourceCache();
