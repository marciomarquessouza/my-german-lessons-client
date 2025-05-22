import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import LinearProgress from "@mui/material/LinearProgress";
import type { Navigation } from "@toolpad/core/AppProvider";
import HikingIcon from "@mui/icons-material/Hiking";
import Logo from "@/components/core/Logo";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import FaceIcon from "@mui/icons-material/Face";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import theme from "../theme";
import { auth } from "@/lib/auth";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  { kind: "divider" },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  { kind: "divider" },
  {
    segment: "trails",
    title: "Trails",
    icon: <HikingIcon />,
  },
  { kind: "divider" },
  {
    segment: "lessons",
    title: "Lessons",
    icon: <CollectionsBookmarkIcon />,
  },
  { kind: "divider" },
  {
    segment: "challenges",
    title: "Challenges",
    icon: <EmojiEventsIcon />,
  },
  { kind: "divider" },
  {
    segment: "stamps",
    title: "Stamps",
    icon: <LocalPostOfficeIcon />,
  },
  { kind: "divider" },
  {
    segment: "users",
    title: "Users",
    icon: <FaceIcon />,
  },
];

const BRANDING = {
  title: "Learning with Ghosts",
  logo: <Logo />,
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html
      lang="en"
      data-toolpad-color-scheme="light"
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <React.Suspense fallback={<LinearProgress />}>
              <NextAppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                theme={theme}
                session={session}
                authentication={AUTHENTICATION}
              >
                {props.children}
              </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
