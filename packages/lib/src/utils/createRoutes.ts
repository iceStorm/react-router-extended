import type { ExtendedRoutesMapping } from '../types/ExtendedRoute';

/**
 *
 */
export const createRoutes =
  <T>() =>
  <const R extends ExtendedRoutesMapping<T>>(routes: R): Readonly<R> => {
    return Object.freeze(patchDefaultPath(routes)) as Readonly<R>;
  };

/**
 * For each route, if no 'path' is provided, use the key as path.
 */
const patchDefaultPath = <T>(
  routes: ExtendedRoutesMapping<T>
): ExtendedRoutesMapping<T> => {
  Object.entries(routes).forEach(([key, value]) => {
    // only patch default path when:
    // - not an index route
    // AND
    // - path is not defined by user
    if (
      !(key === 'index') &&
      (value.path === undefined || value.path === null)
    ) {
      value.path = key;
    }

    if (key === 'index') {
      Object.assign(value, { index: true });
    }

    if (value.children) {
      patchDefaultPath(value.children);
    }
  });

  return routes;
};
