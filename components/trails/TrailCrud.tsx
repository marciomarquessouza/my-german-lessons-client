"use client";
import { Crud, DataSource } from "@toolpad/core/Crud";
import {
  Trail,
  TrailModel,
  trailsCache,
  trailsDataSource,
} from "@/data/trails";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { GridRowParams } from "@mui/x-data-grid";
import { CustomAction } from "../core/CustomAction";
import FileOpenIcon from "@mui/icons-material/FileOpen";

export function TrailCrud() {
  const fields = trailsDataSource.fields;
  const router = useRouter();
  const getActions = useCallback(
    (params: GridRowParams<Trail>) => [
      <CustomAction
        key="open"
        icon={<FileOpenIcon fontSize="inherit" />}
        onClick={() => {
          const searchParams = new URLSearchParams({
            page: "0",
            pageSize: "25",
            sort: JSON.stringify([
              {
                field: "floorPosition",
                sort: "asc",
              },
            ]),
            filter: JSON.stringify({
              items: [
                {
                  field: "trailId",
                  operator: "is",
                  id: params.id,
                  value: params.id,
                },
              ],
            }),
          });
          router.push(`/lessons?${searchParams.toString()}`);
        }}
      />,
    ],
    [router]
  );
  const updatedFields = fields.map((field) => {
    return field.field === "open-lessons"
      ? {
          ...field,
          getActions,
        }
      : field;
  });

  const updatedDataSource: DataSource<TrailModel> = {
    ...trailsDataSource,
    fields: updatedFields,
  };

  return (
    <Crud<TrailModel>
      dataSource={updatedDataSource}
      dataSourceCache={trailsCache}
      rootPath="/trails"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
