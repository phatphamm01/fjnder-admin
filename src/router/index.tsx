import {
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PATHS } from '~/router/paths';
import { ErrorPage } from '../pages/error/index';
import { RouteObject } from '~/types/react-router-dom';
import { Login } from '~/pages/login';
import { TagPage } from '~/pages/manager/tabs';
import { AllUserPage } from '~/pages/user/all';
import { ReportPage } from '~/pages/user/report';
import { EmptyComponent } from '~/components/Empty';
import PrivateRoute from '~/components/router-layout/PrivateRoute';
import { DashboardLayout } from '~/layouts/DashboardLayout';

const dashboardRoutes: RouteObject[] = [
  {
    title: 'Dashboard',
    icon: HomeIcon,
    path: PATHS.DASHBOARD.SELF,
    element: (
      <Fragment>
        <EmptyComponent />
      </Fragment>
    ),
  },
  {
    title: 'Người dùng',
    icon: UserIcon,
    path: PATHS.USER.SELF,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.USER.ALL} />,
      },
      {
        title: 'All',
        icon: UsersIcon,
        path: PATHS.USER.ALL,
        element: (
          <Fragment>
            <AllUserPage />
          </Fragment>
        ),
      },
      {
        title: 'Báo cáo',
        icon: ExclamationTriangleIcon,
        path: `${PATHS.USER.REPORT}`,
        element: (
          <Fragment>
            <ReportPage />
          </Fragment>
        ),
      },
    ],
  },
  {
    title: 'Quản lí',
    icon: Cog6ToothIcon,
    path: PATHS.MANAGER.SELF,
    children: [
      {
        title: 'Tag',
        icon: TagIcon,
        path: PATHS.MANAGER.TAG,
        element: (
          <Fragment>
            <TagPage />
          </Fragment>
        ),
      },
    ],
  },
];

const allRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <Navigate to={PATHS.DASHBOARD.SELF} />,
      },
      {
        path: '/',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: dashboardRoutes,
      },
      {
        path: PATHS.LOGIN,
        element: <Login />,
      },
    ],
  },
];

export const router = createBrowserRouter(allRoutes);
const getNavbarPath = (data: RouteObject[]) => {
  const getPath = (paths: RouteObject[]): RouteObject[] => {
    return paths
      .map(path => {
        if (path.title && path.children) {
          return { ...path, children: getPath(path.children) };
        }

        if (path.title) {
          return path;
        }
      })
      .filter(Boolean) as any;
  };

  return getPath(data);
};

const getDeepPath = () => {
  const deepPath = new Map<string, { title: string; path: string }[]>();
  const handleDeepPath = (
    data: RouteObject[],
    paths: { title: string; path: string }[],
  ) => {
    data.forEach(value => {
      if (value.path && value.title) {
        deepPath.set(value.path, [
          ...paths,
          { path: value.path, title: value.title },
        ]);

        if (value.children) {
          handleDeepPath(value.children, [
            ...paths,
            { path: value.path, title: value.title },
          ]);
        }
      }
    });
  };
  handleDeepPath(dashboardRoutes, []);

  return deepPath;
};

export const deepPath = getDeepPath();
export const navbarList = getNavbarPath(dashboardRoutes);

console.log({ deepPath });
