import { lazy } from "react";

import { initializeExtendedRoutes } from "@open-react/react-router-extended";

import { MainLayout } from "../layouts/main-layout";

const HomePage = lazy(() => import("../pages/home"));
const AboutPage = lazy(() => import("../pages/about"));

export type ApplicationCustomRouteProps = {
  title?: string;
  crumb?: boolean;
};

/**
 * Declare your appication routes.
 *
 * Naming it as a truly constant because this object is readonly by default.
 *
 * You can also use this object on pages to extract a route's param or redirect using the paths.
 */
const AppRoutes = initializeExtendedRoutes<ApplicationCustomRouteProps>()({
  root: {
    path: "",
    element: <MainLayout />,
    children: {
      index: {
        index: true,
        element: <HomePage />,
      },

      about: {
        path: "about",
        element: <AboutPage />,
      },
    },
  },
});

export default AppRoutes;
