import * as React from "react";
import { Crud } from "@toolpad/core/Crud";
import { StampModel, stampsCache, stampsDataSource } from "@/data/stamps";

export default function EmployeesCrudPage() {
  return (
    <Crud<StampModel>
      dataSource={stampsDataSource}
      dataSourceCache={stampsCache}
      rootPath="/stamps"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
