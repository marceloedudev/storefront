import { RouteProps } from '@core/main';
import { lazy } from 'react';

const NotFound = lazy(() => import('@main/pages/not-found'));

export default [
  {
    component: NotFound,
    path: '*',
    exact: true,
  },
] as RouteProps[];
