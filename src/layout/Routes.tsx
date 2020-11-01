import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute/PublicRoute';
import { URLs } from '../config/enums';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path={URLs.ROOT} component={WelcomePage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
