import type {
  ExtendedRouteObject,
  ExtendedRoutesMapping,
} from '../types/ExtendedRouteObject';

/**
 *
 */
export const createExtendedRoutes =
  <const T extends object>() =>
  <
    const R extends {
      [key in string]: ExtendedRouteObject<T>;
    }
  >(
    routes: R
  ): R => {
    return Object.freeze(patchDefaultPath(routes)) as R;
  };

const patchDefaultPath = <T extends object>(
  routes: ExtendedRoutesMapping<T>
) => {
  Object.entries(routes).forEach(([key, value]) => {
    if ((value.path === undefined || value.path === null) && !value.index) {
      value.path = key;
    }

    if (value.children) {
      patchDefaultPath(value.children);
    }
  });

  return routes;
};
