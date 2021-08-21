import {
  BrowserRouter,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import React, { Suspense } from 'react';
import { RouteProps, RoutePropsDOM, Switch } from '@core/main';
import { currentAccountState, currentTokenState } from '@view/atoms';

import AuthLayout from '@view/components/Layout/auth-layout';
import DefaultLayout from '@view/components/Layout/default-layout';
import LoadingBase from '@view/components/LoadingBase';
import notFound from './not-found';
import routes from './routes';
import { useRecoilValue } from 'recoil';

const RoutePath: React.FC<RoutePropsDOM | RouteProps | any> = ({
  isPrivate = false,
  isLogged = true,
  component: Component,
  ...rest
}) => {
  const { getAccessToken } = useRecoilValue(currentTokenState);

  const accountState = useRecoilValue(currentAccountState);

  const logged = !!getAccessToken()?.length;

  if (!logged && isPrivate) {
    return <Redirect to="/" />;
  }

  if (!isLogged && logged) {
    return <Redirect to="/user/profile" />;
  }

  const Layout = logged ? DefaultLayout : AuthLayout;

  if (accountState.loading && logged) {
    return <LoadingBase />;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={(props: RoutePropsDOM) => (
        <>
          <Layout>
            <Component {...props} />
          </Layout>
        </>
      )}
    />
  );
};

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingBase />}>
      <BrowserRouter>
        <Switch>
          {[...routes, ...notFound].map((route) => (
            <RoutePath
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
              isPrivate={route.isPrivate}
              isLogged={route.isLogged}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
