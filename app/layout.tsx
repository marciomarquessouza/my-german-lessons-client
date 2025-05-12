import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LinearProgress from "@mui/material/LinearProgress";
import type { Navigation } from "@toolpad/core/AppProvider";
import HikingIcon from "@mui/icons-material/Hiking";
import Logo from "@/components/core/Logo";

import theme from "../theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  { kind: "divider" },
  {
    segment: "",
    title: "Trails",
    icon: <HikingIcon />,
  },
  { kind: "divider" },
  {
    segment: "lessons/all",
    title: "All Lessons",
    icon: <CollectionsBookmarkIcon />,
  },
  { kind: "divider" },
  {
    segment: "stamps",
    title: "Stamps",
    icon: <LocalPostOfficeIcon />,
  },
];

const BRANDING = {
  title: "Learning with Ghosts - Lessons",
  logo: <Logo />,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-toolpad-color-scheme="light"
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
