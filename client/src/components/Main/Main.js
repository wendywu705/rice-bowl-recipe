import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import Login from '../../pages/Login/Login';
import UploadTest from '../../pages/UploadTest';
import SingleRecipePage from '../../pages/SingleRecipe';
import MealPlanner from '../../pages/MealPlanner/MealPlanner';
import Browse from '../../pages/Browse';
import ParseRecipe from '../../pages/ParseRecipe';
import ShoppingList from '../../pages/ShoppingList';
import SearchPage from '../../pages/SearchPage';
import EditRecipe from '../../pages/EditRecipe';

const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/mealplanner" component={MealPlanner} />
        <Route path="/upload" component={UploadTest} />
        <Route path="/browse" component={Browse} />
        <Route path="/home" component={Home} />
        <Route path="/new_recipe" component={NewRecipe} />
        <Route path="/recipe/:id" component={SingleRecipePage} />
        <Route path="/parse" component={ParseRecipe} />
        <Route path="/list" component={ShoppingList} />
        <Route path="/search/:name" component={SearchPage} />
        <Route path="/edit/:id" component={EditRecipe} />
      </Switch>
    </div>
  );
};

export default Main;
