import { lazy } from 'react';

import { createRoutes } from '@open-react/react-router-extended';

import { MainLayout } from '../layouts/main-layout';

const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about'));
const PostsPage = lazy(() => import('../pages/posts'));
const PostDetailsPage = lazy(() => import('../pages/post-details'));

export type ApplicationCustomRouteProps = {
  title?: string;
  crumb?: boolean;

  // add more props as your needs
  // may be `requiredPermissions: Permisson[]` to handle your own authorization logic ?!
};

/**
 * Declare your appication routes.
 *
 * Naming it as a truly constant because this object is readonly by default.
 *
 * You can also use this object on pages to extract a route's param or redirect using the paths.
 */
const AppRoutes = createRoutes<ApplicationCustomRouteProps>()({
  root: {
    path: '',
    element: <MainLayout />,
    children: {
      // a child with key as 'index' will be populated as index: true when for react-router-dom
      index: {
        title: 'Home',
        element: <HomePage />,
      },

      about: {
        element: <AboutPage />,
        title: 'About',
      },

      posts: {
        title: 'Posts',
        path: 'postx',
        element: <PostsPage />,
        children: {
          details: {
            path: ':post_id',
            element: <PostDetailsPage />,
          },
        },
      },
    },
  },
});

export default AppRoutes;
