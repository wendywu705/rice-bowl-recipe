import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import SingleRecipe from '../SingleRecipe/Single';

const Main = () => {
    return (
        <Switch> {}
            <Route exact path='/' component={Home}/>
            <Route exact path='/new_recipe' component={NewRecipe}/>
            <Route exact path='/single' component={SingleRecipe} />
        </Switch>
    );
}

export default Main;