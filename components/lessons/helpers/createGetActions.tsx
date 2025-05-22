import { JSXElementConstructor, ReactElement, useCallback } from "react";
import { GridRowParams } from "@mui/x-data-grid";
import { Lesson } from "@/generated/prisma";
import { CustomAction } from "@/components/core/CustomAction";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const createGetActions =
  (
    router: AppRouterInstance,
    actionPath: string,
    icon: ReactElement<any, string | JSXElementConstructor<any>>
  ) =>
  (params: GridRowParams<Lesson>) => [
    <CustomAction
      key="open"
      icon={icon}
      onClick={() => {
        const searchParams = new URLSearchParams({
          page: "0",
          pageSize: "25",
          filter: JSON.stringify({
            items: [
              {
                field: "lessonId",
                operator: "is",
                id: params.id,
                value: params.id,
              },
            ],
          }),
        });
        router.push(`${actionPath}?${searchParams.toString()}`);
      }}
    />,
  ];
