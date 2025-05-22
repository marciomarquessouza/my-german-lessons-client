"use client";
import {
  Create,
  List,
  Show,
  Edit,
  CrudProvider,
  DataSource,
} from "@toolpad/core/Crud";
import {
  ChallengeModel,
  challengesCache,
  challengesDataSource,
} from "@/data/challenges";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Lesson } from "@/data/lessons";
import { useCallback } from "react";
import { GridFilterItem } from "@mui/x-data-grid";
import { matchPath } from "@/services/utils/matchPath";

export interface ChallengeCrudProps {
  lessons: Lesson[];
}

export function ChallengeCrud({ lessons }: ChallengeCrudProps) {
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

  const rootPath = "/challenges";
  const listPath = rootPath;
  const showPath = `${rootPath}/:id`;
  const createPath = `${rootPath}/new`;
  const editPath = `${rootPath}/:id/edit`;

  const fields = challengesDataSource.fields;

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

  const updatedDataSource: DataSource<ChallengeModel> = {
    ...challengesDataSource,
    fields: updatedFields,
  };

  const handleRowClick = useCallback(
    (noteId: string | number) => {
      router.push(`${rootPath}/${String(noteId)}?${searchParams.toString()}`);
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
    (noteId: string | number) => {
      router.push(
        `${rootPath}/${String(noteId)}/edit?${searchParams.toString()}`
      );
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
    <CrudProvider<ChallengeModel>
      dataSource={updatedDataSource}
      dataSourceCache={challengesCache}
    >
      {pathname === listPath ? (
        <List<ChallengeModel>
          initialPageSize={10}
          onRowClick={handleRowClick}
          onCreateClick={handleCreateClick}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
      ) : null}
      {pathname === createPath ? (
        <Create<ChallengeModel>
          initialValues={{
            sourceLanguage: "en",
            targetLanguage: "de",
            lessonId: lessonId || "",
          }}
          onSubmitSuccess={handleSubmit}
          resetOnSubmit={false}
        />
      ) : null}
      {pathname !== createPath && showNoteId ? (
        <Show<ChallengeModel>
          id={showNoteId}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
      ) : null}
      {editNoteId ? (
        <Edit<ChallengeModel> id={editNoteId} onSubmitSuccess={handleEdit} />
      ) : null}
    </CrudProvider>
  );
}
