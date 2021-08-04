import React from "react";
import SideBar from "../components/Layout/Sider";
import SingleRecipe from '../components/SingleRecipe/Single'
import WebsiteFooter from "../components/Layout/Footer";

function SingleRecipePage() {
    return (
        <div>
            <SideBar />
            <SingleRecipe/>
            <WebsiteFooter />
        </div>
    );
}

export default SingleRecipePage;
