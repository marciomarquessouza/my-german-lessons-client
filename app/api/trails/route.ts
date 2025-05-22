import { NextRequest, NextResponse } from "next/server";
import type {
  GridFilterItem,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import type { OmitId } from "@toolpad/core/Crud";
import { createTrail, getAllTrails } from "@/services/trails";
import { Trail, TrailModel } from "@/data/trails";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page: GridPaginationModel["page"] =
    Number(searchParams.get("page")) || 0;
  const pageSize: GridPaginationModel["pageSize"] =
    Number(searchParams.get("pageSize")) || 10;
  const sortModel: GridSortModel = searchParams.get("sort")
    ? JSON.parse(searchParams.get("sort")!)
    : [];
  const filterModel: GridFilterItem[] = searchParams.get("filter")
    ? JSON.parse(searchParams.get("filter")!)
    : [];

  const trails = await getAllTrails();

  let filteredItems = [...trails];

  if (filterModel?.length > 0) {
    filterModel.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredItems = filteredItems.filter((item) => {
        // @ts-ignore
        const itemValue = item[field];

        switch (operator) {
          case "contains":
            return String(itemValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "is":
          case "equals":
            return itemValue === value;
          case "startsWith":
            return String(itemValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(itemValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return (itemValue as number) > value;
          case "<":
            return (itemValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedItems = filteredItems.slice(start, end);

  return NextResponse.json({
    items: paginatedItems,
    itemCount: filteredItems.length,
  });
}

export async function POST(req: NextRequest) {
  const newTrail: Partial<OmitId<TrailModel>> = await req.json();
  const createdTrail = await createTrail(newTrail as Omit<Trail, "id">);
  return NextResponse.json(createdTrail, { status: 201 });
}
