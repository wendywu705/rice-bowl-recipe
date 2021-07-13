import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';

const Main = () => {
    return (
        <Switch> {}
            <Route exact path='/' component={Home}/>
            <Route exact path='/new_recipe' component={NewRecipe}/>
        </Switch>
    );
}

export default Main;