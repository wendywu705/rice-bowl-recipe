import React from "react";
import Form from '../components/NewRecipe/Form'
import SideBar from "../components/Layout/Sider";
import WebsiteFooter from '../components/Layout/Footer';

function NewRecipe() {
    return (
        <div>
            <SideBar />
            <Form/>
            <WebsiteFooter />
        </div>
    );
}

export default NewRecipe;
