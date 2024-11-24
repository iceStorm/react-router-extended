import { RouteObject } from 'react-router-dom';

import { ExtendedRoute, ExtendedRoutesMapping } from '../types/ExtendedRoute';

export type TransformRoutesFnProps<T extends object> = {
  /**
   * An array of extended route objects.
   */
  readonly extendedRoutes: ExtendedRoutesMapping<T>;

  /**
   * @private internal use only. Provide a parent route when mapping over a set of child routes. Useful for getting parent information.
   */
  readonly _parentRoute?: [string, ExtendedRoute<T>];

  /**
   * A callback hook to transform an `ExtendedRouteObject` to a normal `RouteObject`.
   * Only run once when initializing the router.
   */
  readonly onTransformRoute: (props: TransformedRouteProps<T>) => RouteObject;
};

export type TransformedRouteProps<T extends object> = {
  /**
   * An extended route being transformed.
   */
  route: Omit<ExtendedRoute<T>, 'children'> & {
    children?: RouteObject[];
  };

  /**
   * Indicate the parent of an extended route.
   */
  parentRoute?: ExtendedRoute<T>;
};

export const transformRoutes = <T extends object>(
  props: TransformRoutesFnProps<T>
): RouteObject[] => {
  const { extendedRoutes, _parentRoute, onTransformRoute } = props;

  const routesArray = Object.entries(extendedRoutes);

  const transformedRoutes: RouteObject[] = [];

  routesArray.forEach((currentRoute) => {
    const [key, { children }] = currentRoute;

    let transformedChildren: RouteObject[] | undefined = undefined;

    const isIndexRoute = key === 'index';

    // recursively map over child routes
    if (!isIndexRoute && children && Object.keys(children).length > 0) {
      transformedChildren = transformRoutes({
        extendedRoutes: children,
        _parentRoute: currentRoute,
        onTransformRoute,
      });
    }

    const transformedRoute = onTransformRoute({
      route: {
        ...currentRoute[1],
        children: isIndexRoute ? undefined : transformedChildren,
      },
      parentRoute: _parentRoute?.[1],
    });

    if (!transformedRoute.children) {
      delete transformedRoute.children;
    }

    transformedRoutes.push(transformedRoute);
  });

  return transformedRoutes;
};
