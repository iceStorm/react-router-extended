type Route<T> = {
  title?: string;
  path?: string;
  element: JSX.Element;
  children?: Record<string, Route<T>>;
};

// Flattening the routes
type FlattenedRoutes<
  T extends Record<string, any>,
  ParentPath extends string = ''
> = {
  [K in keyof T]: T[K] extends Route<T>
    ? {
        path: `${ParentPath}${T[K]['path'] extends string
          ? `/${T[K]['path']}`
          : ''}`;
        title: T[K]['title'];
        element: T[K]['element'];
      } & (T[K]['children'] extends Record<string, any>
        ? FlattenedRoutes<
            T[K]['children'],
            `${ParentPath}${T[K]['path'] extends string
              ? `/${T[K]['path']}`
              : ''}`
          >
        : {})
    : never;
}[keyof T];

// Example of the original routes
const routes = {
  element: <></>,
  children: {
    index: {
      title: 'Home',
      element: <></>,
    },
    about: {
      element: <></>,
      title: 'About',
    },
    posts: {
      title: 'Posts',
      path: 'postx',
      element: <></>,
      children: {
        details: {
          path: ':post_id',
          element: <></>,
        },
      },
    },
  },
} as const;

// Flattened type
type FlattenedRoutesType = FlattenedRoutes<(typeof routes)['children']>;
