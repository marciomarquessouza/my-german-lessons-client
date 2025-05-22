"use client";
import { STAMP_CLASSES, STAMP_TYPES } from "@/constants/stamps";
import { DataModel, DataSource, DataSourceCache } from "@toolpad/core";
import { z } from "zod";

export interface Stamp {
  id: string;
  type: string;
  class: string;
  lessonId: string;
  price: number;
  quantity: number;
  penalty: number;
}

export type StampModel = Stamp & DataModel;

const API_URL = "/api/stamps";

export const stampsDataSource: DataSource<StampModel> = {
  fields: [
    {
      field: "type",
      headerName: "Type",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      valueOptions: STAMP_TYPES,
    },
    {
      field: "class",
      headerName: "Class",
      type: "singleSelect",
      align: "center",
      headerAlign: "center",
      valueOptions: STAMP_CLASSES,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 120,
    },
    {
      field: "penalty",
      headerName: "Penalty",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 100,
    },
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
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  validate: z.object({
    type: z
      .string({ required_error: "type is required" })
      .nonempty("type is required"),
    class: z
      .string({ required_error: "class is required" })
      .nonempty("class is required"),
  })["~standard"].validate,
};

export const stampsCache = new DataSourceCache();
