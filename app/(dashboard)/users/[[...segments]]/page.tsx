import * as React from "react";
import { Crud } from "@toolpad/core/Crud";
import { UserModel, usersCache, usersDataSource } from "@/data/users";

export default function UsersCrudPage() {
  return (
    <Crud<UserModel>
      dataSource={usersDataSource}
      dataSourceCache={usersCache}
      rootPath="/users"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
