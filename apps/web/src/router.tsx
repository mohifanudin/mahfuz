import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { createQueryClient } from "./lib/query";
import { RouteError } from "./components/RouteError";

export function getRouter() {
  const queryClient = createQueryClient();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPendingMinMs: 200,
    defaultErrorComponent: RouteError,
    context: { queryClient, session: null as any },
  });
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
