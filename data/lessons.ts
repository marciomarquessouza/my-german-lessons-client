"use client";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { z } from "zod";

export interface Lesson {
  id: string;
  trailId: string;
  name: string;
  slugName: string;
  description: string;
  doorTitle: string;
  roomPosition: number;
  floorPosition: number;
}

export type LessonModel = Lesson & DataModel;

const API_URL = "/api/lessons";

export const lessonsDataSource: DataSource<LessonModel> = {
  fields: [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "doorTitle", headerName: "Door Title", width: 200 },
    {
      field: "floorPosition",
      headerName: "Floor",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 60,
    },
    {
      field: "roomPosition",
      headerName: "Room",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 60,
    },
    {
      field: "trailId",
      headerName: "Trail",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      width: 60,
    },
    {
      field: "open-challenges",
      type: "actions",
      headerName: "Challenges",
      align: "center",
      headerAlign: "center",
      width: 100,
    },
    {
      field: "open-stamps",
      type: "actions",
      headerName: "Stamps",
      align: "center",
      headerAlign: "center",
      width: 100,
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
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  validate: z.object({
    name: z
      .string({ required_error: "name is required" })
      .nonempty("name is required"),
    doorTitle: z
      .string({ required_error: "doorTitle is required" })
      .nonempty("title is required"),
  })["~standard"].validate,
};

export const lessonsCache = new DataSourceCache();
