"use client";
import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { usePathname, useParams } from "next/navigation";

export default function Layout(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const [stampId] = params.segments ?? [];

  const title = React.useMemo(() => {
    if (pathname === "/stamps/new") {
      return "New Stamp";
    }
    if (stampId && pathname.includes("/edit")) {
      return `Stamp ${stampId} - Edit`;
    }
    if (stampId) {
      return `Stamp ${stampId}`;
    }
    return undefined;
  }, [stampId, pathname]);

  return (
    <DashboardLayout>
      <PageContainer title={title}>{props.children}</PageContainer>
    </DashboardLayout>
  );
}
