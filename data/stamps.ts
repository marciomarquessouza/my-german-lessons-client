"use client";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { z } from "zod";

export interface Stamp {
  id: string;
  title: string;
  description: string;
  type: string;
  class: string;
}

export type StampModel = Stamp & DataModel;

const API_URL = "/api/stamps";

export const stampsDataSource: DataSource<StampModel> = {
  fields: [
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "type", headerName: "Type" },
    { field: "class", headerName: "Class" },
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
    title: z
      .string({ required_error: "title is required" })
      .nonempty("title is required"),
    type: z
      .string({ required_error: "type is required" })
      .nonempty("type is required"),
    class: z
      .string({ required_error: "class is required" })
      .nonempty("class is required"),
  })["~standard"].validate,
};

export const stampsCache = new DataSourceCache();
