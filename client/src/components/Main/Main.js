import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import NewRecipe from '../../pages/NewRecipe';
import SideBar from '../Sider/Sider';

const Main = () => {
    return (
        <div>
            <SideBar />
            <Switch> {}
                <Route exact path='/' component={Home}/>
                <Route exact path='/new_recipe' component={NewRecipe}/>
            </Switch>
            
        </div>
    );
}

export default Main;