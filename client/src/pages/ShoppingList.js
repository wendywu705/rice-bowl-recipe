import React from "react";
import SideBar from "../components/Layout/Sider";
import ShopList from "../components/ShoppingList/ShopList";
import WebsiteFooter from "../components/Layout/Footer";

function ShoppingList() {
    return (
        <div>
            <SideBar />
            <ShopList />
            <WebsiteFooter />
        </div>
    );
}

export default ShoppingList;
