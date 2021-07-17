import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import Login from '../../pages/Login/Login';
import PageLayout from '../Layout/Layout';
// import SiderBar from '../Layout/Sider';

const Main = () => {
  return (
    <div>
      <PageLayout />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/new_recipe" component={NewRecipe} />
        <Route exact path="/side" component={PageLayout} />
      </Switch>
    </div>
  );
};

export default Main;
