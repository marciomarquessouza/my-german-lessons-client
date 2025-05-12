import { NextRequest, NextResponse } from "next/server";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import type { OmitId } from "@toolpad/core/Crud";
import { createStamp, getAllStamps } from "@/services/stamps";
import { Stamp, StampModel } from "@/data/stamps";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page: GridPaginationModel["page"] =
    Number(searchParams.get("page")) || 0;
  const pageSize: GridPaginationModel["pageSize"] =
    Number(searchParams.get("pageSize")) || 10;
  const sortModel: GridSortModel = searchParams.get("sort")
    ? JSON.parse(searchParams.get("sort")!)
    : [];
  const filterModel: GridFilterModel = searchParams.get("filter")
    ? JSON.parse(searchParams.get("filter")!)
    : [];

  const stamps = await getAllStamps();

  let filteredStamps = [...stamps];

  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredStamps = stamps.filter((stamp) => {
        // @ts-ignore
        const stampValue = stamps[field];

        switch (operator) {
          case "contains":
            return String(stampValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "equals":
            return stampValue === value;
          case "startsWith":
            return String(stampValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(stampValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return (stampValue as number) > value;
          case "<":
            return (stampValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedEmployees = filteredStamps.slice(start, end);

  return NextResponse.json({
    items: paginatedEmployees,
    itemCount: filteredStamps.length,
  });
}

export async function POST(req: NextRequest) {
  const newStamp: Partial<OmitId<StampModel>> = await req.json();
  await createStamp(newStamp as Omit<Stamp, "id">);
  return NextResponse.json(newStamp, { status: 201 });
}
