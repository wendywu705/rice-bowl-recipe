import React from "react";
import SideBar from "../components/Layout/Sider";
import WebsiteFooter from '../components/Layout/Footer';
import Edit from "../components/NewRecipe/Edit";

function EditRecipe() {
    return (
        <div>
            <SideBar />
            <Edit />
            <WebsiteFooter />
        </div>
    );
}

export default EditRecipe;
