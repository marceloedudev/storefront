import React, { ComponentType } from 'react';
import {
  RouteComponentProps as ReactDOMRouteProps,
  Switch,
} from 'react-router-dom';

interface BaseRotesProps {
  isPrivate?: boolean;
  path: string;
  exact?: boolean;
  isLogged?: boolean;
  notLogged?: boolean;
}

export interface RoutePropsDOM extends ReactDOMRouteProps, BaseRotesProps {
  component: React.ComponentType | JSX.Element | any;
}

export interface RouteProps extends BaseRotesProps {
  component: ComponentType<ReactDOMRouteProps>;
}

export { Switch };

export interface IRoutersDecorator {
  name: string;
  imports: RouteProps[];
}

export function Routers(filter: IRoutersDecorator) {
  const { name, imports } = filter;

  return (target) => {
    target.prototype[name] = imports;
    let instance = new target();
    instance = imports.map((item) => {
      return {
        ...item,
        path: `${name.length === 1 ? '' : name}${item.path}`,
      };
    });

    return instance;
  };
}
