import React from "react";
import RecipeList from '../../components/RecipeList/RecipeList'
import SideBar from "../../components/Layout/Sider";
import WebsiteFooter from '../../components/Layout/Footer';

function Home() {
    return (
        <div>
            <SideBar />
            <RecipeList />
            <WebsiteFooter />
        </div>
    );
}

export default Home;
