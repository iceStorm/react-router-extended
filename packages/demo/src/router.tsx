import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import {
  flattenRoutes,
  transformRoutes,
} from '@open-react/react-router-extended';

import AppRoutes, { ApplicationCustomRouteProps } from './constants/routes';

/**
 * Transform the extended routes to react-router-dom compatible routes.
 */
const transformedRoutes = transformRoutes<ApplicationCustomRouteProps>({
  extendedRoutes: AppRoutes,

  onTransformRoute({ route, parentRoute }) {
    // be careful when destructuring - as it may cause missing props in the returned RouteObject
    // only destruct props you want - and remember to re-assign them to the `transformedRoute` if needed
    const { crumb, title, element, ...defaultRouteObject } = route;

    const transformedRoute = defaultRouteObject as RouteObject;

    // wrap a route's element with customized logics/components
    transformedRoute.element = (
      <>
        {/* automatic update a page's title */}
        <Helmet key={title} title={title}></Helmet>

        {/* do even more with your own custom route props */}
        {element}
      </>
    );

    return transformedRoute;
  },
});

console.log('transformed:', transformedRoutes);

export const AppFlattendRoutes = flattenRoutes(AppRoutes);
console.log('flattended:', AppFlattendRoutes);

const AppRouter = () => (
  <RouterProvider router={createBrowserRouter(transformedRoutes)} />
);

export default AppRouter;
