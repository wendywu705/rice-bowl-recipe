import React from 'react';
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import * as GoIcons from "react-icons/go";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Browse',
        path: '/browse',
        icon: <GoIcons.GoBrowser />,
        cName: 'nav-text'
    },
    {
        title: 'Meal Planner',
        path: '/meal-planner',
        icon: <IoIcons.IoIosCalendar />,
        cName: 'nav-text'
    },
    {
        title: 'Cart',
        path: '/cart',
        icon: <AiIcons.AiOutlineShoppingCart />,
        cName: 'nav-text'
    },
    
]