import { Routers } from '@core/main';
import { lazy } from 'react';

const MakeDashboardHome = lazy(
  () => import('@main/pages/dashboard/dashboard-home'),
);

@Routers({
  name: '/dashboard',
  imports: [
    {
      component: MakeDashboardHome,
      path: '/home',
      isPrivate: true,
    },
  ],
})
export default class DashboardRoutes {}
