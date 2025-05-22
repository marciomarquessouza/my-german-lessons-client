"use client";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { z } from "zod";

export interface Trail {
  id: string;
  name: string;
  slugName: string;
  title: string;
  rooms: number;
  floors: number;
}

export type TrailModel = Trail & DataModel;

const API_URL = "/api/trails";

export const trailsDataSource: DataSource<TrailModel> = {
  fields: [
    { field: "name", headerName: "Name", width: 250 },
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "rooms",
      headerName: "Rooms",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "floors",
      headerName: "Floors",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "open-lessons",
      type: "actions",
      headerName: "Lessons",
      align: "center",
      headerAlign: "center",
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
    title: z
      .string({ required_error: "title is required" })
      .nonempty("title is required"),
  })["~standard"].validate,
};

export const trailsCache = new DataSourceCache();
