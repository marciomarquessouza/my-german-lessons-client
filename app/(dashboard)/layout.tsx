"use client";
import * as React from "react";
import capitalize from "lodash/capitalize";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { usePathname, useParams } from "next/navigation";

export default function Layout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const [id] = params.segments ?? [];
  const name = capitalize(pathname.split("/")[1] || "");

  const title = React.useMemo(() => {
    if (pathname.includes("/new")) {
      return `New ${name}`;
    }
    if (id && pathname.includes("/edit")) {
      return `${name} ${id} - Edit`;
    }
    if (id) {
      return `${name} ${id}`;
    }
    return undefined;
  }, [id, pathname, name]);

  return (
    <DashboardLayout>
      <PageContainer title={title}>{props.children}</PageContainer>
    </DashboardLayout>
  );
}
