import RecipeList from '../../components/RecipeList/RecipeList'
import './Home.css'
import PageLayout from "../../components/Layout/Layout";
import React from "react";

function Home() {
    return (
        <div>
            <PageLayout />
            <RecipeList/>
        </div>
    );
}

export default Home;
