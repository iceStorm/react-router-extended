# ReactRouterExtended

React Router Dom - Configure your routing with confidence.

## Install

```
npm i @open-react/react-router-extended

pnpm i @open-react/react-router-extended

yarn i @open-react/react-router-extended
```

## Usage

```TypeScript
// routes.tsx

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
        path: 'about',
        element: <AboutPage />,
      },
    },
  },
});

export default AppRoutes;
```

```TypeScript
// router.tsx

import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import { transformExtendedRoutes } from '@open-react/react-router-extended';

import AppRoutes, { ApplicationCustomRouteProps } from './constants/routes';

/**
 * Transform the extended routes to react-router-dom compatible routes.
 */
const transformedRoutes = transformExtendedRoutes<ApplicationCustomRouteProps>({
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

const AppRouter = () => (
  <RouterProvider router={createBrowserRouter(transformedRoutes)} />
);

export default AppRouter;
```

```TypeScript
// main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import AppRouter from './router';

import './styles.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <Helmet titleTemplate="%s | react-router-extended"></Helmet>

      <AppRouter />
    </HelmetProvider>
  </StrictMode>
);

createRoot(document.getElementById('root') as HTMLElement).render(app);
```

```TypeScript
// home-page.tsx

import { Link } from 'react-router-dom';

import AppRoutes from '../constants/routes';

export default function HomePage() {
  return (
    <div>
      <h1>Home page.</h1>

      {/* use the AppRoutes to navigate */}
      <Link to={AppRoutes.root.children.about.path} className="underline">
        Go to About
      </Link>
    </div>
  );
}
```
