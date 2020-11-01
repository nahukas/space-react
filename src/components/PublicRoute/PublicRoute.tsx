import React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import PublicLayout from '../../layout/PublicLayout';

interface Props extends RouteComponentProps {
  path: string;
  exact: boolean;
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = ({
  component: Component,
  path,
  exact,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(route) => {
        return (
          <PublicLayout>
            <Component {...route} />
          </PublicLayout>
        );
      }}
    />
  );
};

export default withRouter(PublicRoute);
