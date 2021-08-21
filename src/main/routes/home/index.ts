import { Routers } from '@core/main';
import { lazy } from 'react';

const MakeHomeMap = lazy(() => import('@main/pages/home-map'));
const MakeSignIn = lazy(() => import('@main/pages/user/signin'));

@Routers({
  name: '/',
  imports: [
    {
      component: MakeSignIn,
      path: '/',
      exact: true,
      isLogged: false,
    },
    {
      component: MakeHomeMap,
      path: '/map',
      isPrivate: true,
    },
  ],
})
export default class HomeRoutes {}
