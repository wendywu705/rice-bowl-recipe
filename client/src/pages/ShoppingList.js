import React from "react";
import SideBar from "../components/Layout/Sider";
import List from "../components/ShoppingList/List";
import WebsiteFooter from "../components/Layout/Footer";

function ShoppingList() {
    return (
        <div>
            <SideBar />
            <List />
            <WebsiteFooter />
        </div>
    );
}

export default ShoppingList;
