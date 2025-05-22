"use client";
import { Crud, DataSource } from "@toolpad/core/Crud";
import { LessonModel, lessonsCache, lessonsDataSource } from "@/data/lessons";
import { Trail } from "@/data/trails";
import { useRouter } from "next/navigation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { createGetActions } from "./helpers/createGetActions";

export interface LessonCrudProps {
  trails: Trail[];
}

export function LessonCrud({ trails }: LessonCrudProps) {
  const fields = lessonsDataSource.fields;
  const router = useRouter();
  const valueOptions = trails.map((trail) => ({
    label: trail.name,
    value: trail.id,
  }));

  const updatedFields = fields.map((field) => {
    if (field.field === "open-challenges") {
      return {
        ...field,
        getActions: createGetActions(
          router,
          "/challenges",
          <EmojiEventsIcon />
        ),
      };
    }
    if (field.field === "open-stamps") {
      return {
        ...field,
        getActions: createGetActions(
          router,
          "/stamps",
          <LocalPostOfficeIcon />
        ),
      };
    }
    if (field.field === "trailId") {
      return {
        ...field,
        valueOptions,
      };
    }
    return field;
  });

  const updatedDataSource: DataSource<LessonModel> = {
    ...lessonsDataSource,
    fields: updatedFields,
  };

  return (
    <Crud<LessonModel>
      dataSource={updatedDataSource}
      dataSourceCache={lessonsCache}
      rootPath="/lessons"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
