import React from "react";
import SideBar from "../components/Layout/Sider";
import ParseForm from '../components/ParseRecipe/ParseForm';
import WebsiteFooter from "../components/Layout/Footer";

function ParseRecipe() {
    return (
        <div>
            <SideBar />
            <ParseForm/>
            <WebsiteFooter />
        </div>
    );
}

export default ParseRecipe;
