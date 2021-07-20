import PageLayout from "../components/Layout/Layout";
import React from "react";
import SingleRecipe from '../components/SingleRecipe/Single'

function SingleRecipePage() {
    return (
        <div>
            <PageLayout />
            <SingleRecipe/>
        </div>
    );
}

export default SingleRecipePage;
