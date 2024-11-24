import { generatePath } from 'react-router-dom';

import { ExtendedRoute, FlattenedExtendedRoute } from '../types';
import { extractPathParams } from './extractPathParams';

/**
 * Flatten the created routes. Useful for usage in other places, like nagivation, middlewares...
 */
export const flattenRoutes = <T>(
  routeObjects: ExtendedRoute<T>
): Record<string, FlattenedExtendedRoute<T>> => {
  const flattenedRoutes: Record<string, FlattenedExtendedRoute<T>> = {};

  const routes = Object.entries(routeObjects);

  // [key, ExtendedRoute]
  const stack: [string, ExtendedRoute<T>][] = routes.splice(0, 1);
  const parentsStack: [string, ExtendedRoute<T>][] = [];

  while (stack.length) {
    const [key, currentRoute] = stack.pop()!;

    // ignore populating if is an index route
    // index routes often don't need a path
    if (key === 'index') {
      continue;
    }

    flattenedRoutes[key] = currentRoute as FlattenedExtendedRoute<T>;

    flattenedRoutes[key].parentKey = parentsStack.at(-1)?.[0];

    const fullPath = parentsStack
      .map(([, parentRoute]) => parentRoute.path)
      .concat(currentRoute.path)
      .filter(Boolean)
      .join('/');

    flattenedRoutes[key].fullPath = fullPath;

    // populate path params generatePath function
    const params = extractPathParams(fullPath);
    flattenedRoutes[key].params = params;

    // only create the generatePath function if a route's path contains some params
    if (params.length) {
      flattenedRoutes[key].generatePath = (params) =>
        generatePath(fullPath, params);
    }

    // put children on top of the stack to handle them next
    if (currentRoute.children) {
      parentsStack.push([key, currentRoute]);
      stack.push(...Object.entries(currentRoute.children));

      delete currentRoute.children;
    }

    if (!stack.length) {
      parentsStack.pop();
    }
  }

  return flattenedRoutes;
};
