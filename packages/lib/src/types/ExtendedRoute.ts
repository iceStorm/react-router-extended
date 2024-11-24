import {
  generatePath,
  IndexRouteObject,
  NonIndexRouteObject,
} from 'react-router-dom';

export type ExtendedRoutesMapping<T> = Record<string, ExtendedRoute<T>>;

export type ExtendedRoute<T> = (
  | Omit<IndexRouteObject, 'children' | 'index'>
  | Omit<NonIndexRouteObject, 'children' | 'index'>
) &
  T & {
    children?: { [key in string]: ExtendedRoute<T> } & {
      // 2 important childrend routes that might be declared

      /**
       * Declare an index route.
       */
      index?: ExtendedRoute<T>;

      /**
       * Declare a details route. Useful for routing an item of a list.
       */
      details?: ExtendedRoute<T>;
    };
  };

export type FlattenedExtendedRoute<
  T,
  P extends string = string
> = ExtendedRoute<T> & {
  fullPath?: P;
  params?: string[];
  parentKey?: string;
  path: string;

  /**
   * Generate a full path with parameters
   * @param params url path parameters, passing by key-value pairs.
   * @returns an url that populated the parameters by their values.
   */
  generatePath(params: Parameters<typeof generatePath<P>>[1]): string;
};
