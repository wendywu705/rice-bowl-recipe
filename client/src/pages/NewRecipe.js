import React from "react";
import SideBar from "../components/Layout/Sider";
import WebsiteFooter from '../components/Layout/Footer';
import Form from "../components/NewRecipe/Form";

function NewRecipe() {
    return (
        <div>
            <SideBar />
            <Form type="new"/>
            <WebsiteFooter />
        </div>
    );
}

export default NewRecipe;
