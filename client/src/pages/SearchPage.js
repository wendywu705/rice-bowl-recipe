import React from "react";
import SideBar from "../components/Layout/Sider";
import SearchResult from "../components/SearchResult/SearchResult";
import WebsiteFooter from "../components/Layout/Footer";

function ParseRecipe() {
    return (
        <div>
            <SideBar />
            <SearchResult/>
            <WebsiteFooter />
        </div>
    );
}

export default ParseRecipe;
