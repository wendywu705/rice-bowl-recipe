import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import Login from '../../pages/Login/Login';
import UploadTest from '../../pages/UploadTest';
import PageLayout from '../Layout/Layout';
import SingleRecipePage from '../../pages/SingleRecipe';
import Browse from '../../pages/Browse';
import ParseRecipe from '../../pages/ParseRecipe';

const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/upload" component={UploadTest} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new_recipe" component={NewRecipe} />
        <Route exact path="/side" component={PageLayout} />
        <Route exact path="/recipe/:id" component={SingleRecipePage} />
        <Route exact path="/parse" component={ParseRecipe} />
      </Switch>
    </div>
  );
};

export default Main;
