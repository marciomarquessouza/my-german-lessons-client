import { NextRequest, NextResponse } from "next/server";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import type { OmitId } from "@toolpad/core/Crud";
import { UserModel } from "@/data/users";
import { createUser, getAllUsers } from "@/services/users";

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

  const users = await getAllUsers();

  let filteredUsers = [...users];

  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredUsers = users.filter((user) => {
        // @ts-ignore
        const userValue = user[field];

        switch (operator) {
          case "contains":
            return String(userValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "equals":
            return userValue === value;
          case "startsWith":
            return String(userValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(userValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return (userValue as number) > value;
          case "<":
            return (userValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedEmployees = filteredUsers.slice(start, end);

  return NextResponse.json({
    items: paginatedEmployees,
    itemCount: filteredUsers.length,
  });
}

export async function POST(req: NextRequest) {
  const userPayload: Partial<OmitId<UserModel>> = await req.json();
  const newUser = await createUser(userPayload);
  const { password, ...userWithoutPassword } = newUser;
  return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
}
