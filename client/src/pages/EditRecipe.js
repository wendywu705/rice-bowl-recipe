import React from "react";
import SideBar from "../components/Layout/Sider";
import WebsiteFooter from '../components/Layout/Footer';
import Form from "../components/NewRecipe/Form";

function EditRecipe() {
    return (
        <div>
            <SideBar />
            <Form 
              type="edit"
            />
            <WebsiteFooter />
        </div>
    );
}

export default EditRecipe;
