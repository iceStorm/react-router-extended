import { lazy } from 'react';

import { createExtendedRoutes } from '@open-react/react-router-extended';

import { MainLayout } from '../layouts/main-layout';

const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about'));

export type ApplicationCustomRouteProps = {
  title?: string;
  crumb?: boolean;

  // add more props as your need
  // may be `requiredPermissions: Permisson[]` to handle your own authorization logic ?!
};

/**
 * Declare your appication routes.
 *
 * Naming it as a truly constant because this object is readonly by default.
 *
 * You can also use this object on pages to extract a route's param or redirect using the paths.
 */
const AppRoutes = createExtendedRoutes<ApplicationCustomRouteProps>()({
  root: {
    path: '',
    element: <MainLayout />,
    children: {
      index: {
        index: true,
        title: 'Home',
        element: <HomePage />,
      },

      about: {
        title: 'About',
        element: <AboutPage />,
      },
    },
  },
});

export default AppRoutes;
