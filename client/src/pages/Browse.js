import React from "react";
import Browse from '../components/Browse/Browse';
import SideBar from "../components/Layout/Sider";
import WebsiteFooter from '../components/Layout/Footer';

function Home() {
    return (
        <div>
            <SideBar />
            <Browse/>
            <WebsiteFooter />
        </div>
    );
}

export default Home;
