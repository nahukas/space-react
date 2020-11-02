import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute/PublicRoute';
import { URLs } from '../config/enums';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import WelcomePage from '../pages/WelcomePage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path={URLs.ROOT} component={WelcomePage} />
        {/* <PublicRoute exact path={URLs.ABOUT} component={AboutPage} /> */}
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
