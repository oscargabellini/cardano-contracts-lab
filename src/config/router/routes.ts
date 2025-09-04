import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "../../components/common/root-layout";
import { HomePage } from "../../pages/home";
import { QuizPage } from "../../pages/quiz/quiz.page";
import { UnlockFundsPage } from "../../pages/unlock-assets/unlock-funds.page";
import { UnlockWithPasswordPage } from "../../pages/unlock-with-password/unlock-with-password.page";

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

const unlockWithPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/unlock-with-password",
  component: UnlockWithPasswordPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  unlockFundsRoute,
  unlockWithPasswordRoute,
  quizRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
