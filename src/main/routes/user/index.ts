import { Routers } from '@core/main';
import { lazy } from 'react';

const MakeProfile = lazy(() => import('@main/pages/user/profile'));

@Routers({
  name: '/user',
  imports: [
    {
      component: MakeProfile,
      path: '/profile',
      isPrivate: true,
    },
  ],
})
export default class UserRoutes {}
