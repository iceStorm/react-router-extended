import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export type ExtendedRoutesMapping<T extends object> = Record<
  string,
  ExtendedRouteObject<T>
>;

export type ExtendedRouteObject<T extends object> = (
  | Omit<IndexRouteObject, 'children'>
  | Omit<NonIndexRouteObject, 'children'>
) &
  T &
  (
    | {
        index: true;
        children?: undefined;
      }
    | {
        index?: false;
        children?: Record<string, ExtendedRouteObject<T>>;
      }
  );
