import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "../../components/common/root-layout";
import { HomePage } from "../../pages/home";
import { UnlockFundsPage } from "../../pages/unlock-assets/unlock-funds.page";
import { UnlockFundsWithCustomMessagePage } from "../../pages/unlock-with-custom-message/unlock-with-custom-message.page";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const unlockFundsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/unlock-funds",
  component: UnlockFundsPage,
});

const customMessageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/unlock-funds-with-custom-message",
  component: UnlockFundsWithCustomMessagePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  unlockFundsRoute,
  customMessageRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
