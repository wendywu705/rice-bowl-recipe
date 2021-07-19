import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import Login from '../../pages/Login/Login';
import UploadTest from '../../pages/UploadTest';
import PageLayout from '../Layout/Layout';
import SingleRecipe from '../SingleRecipe/Single';
// import SiderBar from '../Layout/Sider';

const Main = () => {
  return (
    <div>
      <PageLayout />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/upload" component={UploadTest} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new_recipe" component={NewRecipe} />
        <Route exact path="/side" component={PageLayout} />
        <Route exact path="/single/:id" component={SingleRecipe} />
      </Switch>
    </div>
  );
};

export default Main;
