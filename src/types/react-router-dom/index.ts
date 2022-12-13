import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';
import { Path } from 'react-router-dom';
import { PATHS } from '~/router/paths';

export type RouteObject =
  | (IndexRouteObject & { icon?: React.FC<any>; title?: string })
  | (Omit<NonIndexRouteObject, 'children'> & {
      icon?: React.FC<any>;
      title?: string;
      children?: RouteObject[];
    });

type DeepestKeys<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? T[K] : DeepestKeys<T[K]>;
    }[keyof T & string];

export type To = DeepestKeys<typeof PATHS> | Partial<Path>;
