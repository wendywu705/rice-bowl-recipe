import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import PageLayout from '../Layout/Layout';

const Main = () => {
    return (
        <div>
            <Switch> {}
                <Route exact path='/' component={Home}/>
                <Route exact path='/new_recipe' component={NewRecipe}/>
                <Route exact path='/side' component={PageLayout} />
            </Switch>
            
        </div>
    );
}

export default Main;