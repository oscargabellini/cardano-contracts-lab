import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "../components/root-layout";
import { HomePage } from "../modules/home";
import { UnlockFundsPage } from "../modules/unlock-funds/unlock-funds.page";
import { UnlockFundsWithCustomMessagePage } from "../modules/unlock-with-custom-message/unlock-with-custom-message.page";

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
