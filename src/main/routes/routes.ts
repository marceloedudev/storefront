import { RouteProps } from '@core/main';
import dashboard from './dashboard';
import home from './home';
import user from './user';

const routes: RouteProps[] = [
  ...(<any>home),
  ...(<any>user),
  ...(<any>dashboard),
];

export default routes;
