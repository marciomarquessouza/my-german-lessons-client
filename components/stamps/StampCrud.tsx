"use client";
import {
  Create,
  List,
  Show,
  Edit,
  CrudProvider,
  DataSource,
} from "@toolpad/core/Crud";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Lesson } from "@/data/lessons";
import { useCallback } from "react";
import { GridFilterItem } from "@mui/x-data-grid";
import { matchPath } from "@/services/utils/matchPath";
import { StampModel, stampsCache, stampsDataSource } from "@/data/stamps";

export interface StampCrudProps {
  lessons: Lesson[];
}

export function StampCrud({ lessons }: StampCrudProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterModel = searchParams.get("filter")
    ? JSON.parse(searchParams.get("filter")!)
    : {};
  const filterItems = filterModel?.items || [];
  const lessonId = filterItems?.find(
    (item: GridFilterItem) =>
      item.field === "lessonId" && item.operator === "is"
  )?.value;

  const rootPath = "/stamps";
  const listPath = rootPath;
  const showPath = `${rootPath}/:id`;
  const createPath = `${rootPath}/new`;
  const editPath = `${rootPath}/:id/edit`;

  const fields = stampsDataSource.fields;

  const valueOptions = lessons.map((lesson) => ({
    label: lesson.name,
    value: lesson.id,
  }));

  const showNoteId = matchPath(showPath, pathname);
  const editNoteId = matchPath(editPath, pathname);

  const updatedFields = fields.map((field) => {
    return field.field === "lessonId"
      ? {
          ...field,
          valueOptions,
        }
      : field;
  });

  const updatedDataSource: DataSource<StampModel> = {
    ...stampsDataSource,
    fields: updatedFields,
  };

  const handleRowClick = useCallback(
    (id: string | number) => {
      router.push(`${rootPath}/${String(id)}?${searchParams.toString()}`);
    },
    [router, searchParams]
  );

  const handleCreateClick = useCallback(() => {
    router.push(`${createPath}?${searchParams.toString()}`);
  }, [createPath, router, searchParams]);

  const handleSubmit = useCallback(() => {
    router.push(`${listPath}?${searchParams.toString()}`);
  }, [listPath, router, searchParams]);

  const handleEditClick = useCallback(
    (id: string | number) => {
      router.push(`${rootPath}/${String(id)}/edit?${searchParams.toString()}`);
    },
    [router, searchParams]
  );

  const handleEdit = useCallback(() => {
    router.push(`${listPath}?${searchParams.toString()}`);
  }, [listPath, router, searchParams]);

  const handleDelete = useCallback(() => {
    router.push(`${listPath}?${searchParams.toString()}`);
  }, [listPath, router, searchParams]);

  return (
    <CrudProvider<StampModel>
      dataSource={updatedDataSource}
      dataSourceCache={stampsCache}
    >
      {pathname === listPath ? (
        <List<StampModel>
          initialPageSize={10}
          onRowClick={handleRowClick}
          onCreateClick={handleCreateClick}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
      ) : null}
      {pathname === createPath ? (
        <Create<StampModel>
          initialValues={{
            lessonId: lessonId || "",
          }}
          onSubmitSuccess={handleSubmit}
          resetOnSubmit={false}
        />
      ) : null}
      {pathname !== createPath && showNoteId ? (
        <Show<StampModel>
          id={showNoteId}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
      ) : null}
      {editNoteId ? (
        <Edit<StampModel> id={editNoteId} onSubmitSuccess={handleEdit} />
      ) : null}
    </CrudProvider>
  );
}
