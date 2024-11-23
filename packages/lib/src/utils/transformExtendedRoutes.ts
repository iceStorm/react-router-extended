import { RouteObject } from 'react-router-dom';

import {
  ExtendedRouteObject,
  ExtendedRoutesMapping,
} from '../types/ExtendedRouteObject';

export type TransformRoutesFnProps<T extends object> = {
  /**
   * An array of extended route objects.
   */
  readonly extendedRoutes: ExtendedRoutesMapping<T>;

  /**
   * @private internal use only. Provide a parent route when mapping over a set of child routes. Useful for getting parent information.
   */
  readonly _parentRoute?: ExtendedRouteObject<T>;

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
  route: Omit<ExtendedRouteObject<T>, 'children'> & {
    children?: RouteObject[];
  };

  /**
   * Indicate the parent of an extended route.
   */
  parentRoute?: ExtendedRouteObject<T>;
};

export const transformExtendedRoutes = <T extends object>(
  props: TransformRoutesFnProps<T>
): RouteObject[] => {
  const { extendedRoutes, _parentRoute, onTransformRoute } = props;

  const routesArray = Object.values(extendedRoutes);

  const transformedRoutes: RouteObject[] = [];

  routesArray.forEach((currentRoute) => {
    const { children, index } = currentRoute;

    let transformedChildren: RouteObject[] | undefined = undefined;

    // recursively map over child routes
    if (!index && children && Object.keys(children).length > 0) {
      transformedChildren = transformExtendedRoutes({
        extendedRoutes: children,
        _parentRoute: currentRoute,
        onTransformRoute,
      });
    }

    const transformedRoute = onTransformRoute({
      route: {
        ...currentRoute,
        children: index ? undefined : transformedChildren,
      },
      parentRoute: _parentRoute,
    });

    if (!transformedRoute.children) {
      delete transformedRoute.children;
    }

    transformedRoutes.push(transformedRoute);
  });

  return transformedRoutes;
};
