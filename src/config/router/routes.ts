import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "../../components/common/root-layout";
import { HomePage } from "../../pages/home";
import { AddQuestionForm } from "../../pages/quiz/forms/add-question-form";
import { QuestionList } from "../../pages/quiz/question-list";
import { QuizPage } from "../../pages/quiz/quiz.page";
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

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});

const addQuestionRoute = createRoute({
  getParentRoute: () => quizRoute,
  path: "add-question",
  component: AddQuestionForm,
});

const selectQuestionRoute = createRoute({
  getParentRoute: () => quizRoute,
  path: "select-question",
  component: QuestionList,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  unlockFundsRoute,
  customMessageRoute,
  quizRoute.addChildren([addQuestionRoute, selectQuestionRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
