import { RouteObject, RouterProvider, createBrowserRouter } from "react-router";

import { transformExtendedRoutes } from "@open-react/react-router-extended";

import AppRoutes, { ApplicationCustomRouteProps } from "./constants/routes";

/**
 * Transform the extended routes to react-router compatible routes.
 */
const transformedRoutes = transformExtendedRoutes<ApplicationCustomRouteProps>({
  extendedRoutes: AppRoutes,

  onTransformRoute({ route, parentRoute }) {
    const { index, children, crumb, title, element, ...defaultRouteObject } =
      route;

    const transformedRoute: RouteObject = defaultRouteObject;

    if (!index) {
      transformedRoute.children = children;
    }

    transformedRoute.element = (
      <>
        {}

        {element}
      </>
    );

    return transformedRoute;
  },
});

const AppRouter = () => (
  <RouterProvider router={createBrowserRouter(transformedRoutes)} />
);

export default AppRouter;
