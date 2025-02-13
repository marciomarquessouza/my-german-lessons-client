import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LinearProgress from "@mui/material/LinearProgress";
import type { Navigation } from "@toolpad/core/AppProvider";
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
    title: "Lessons",
    icon: <CollectionsBookmarkIcon />,
  },
  { kind: "divider" },
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
