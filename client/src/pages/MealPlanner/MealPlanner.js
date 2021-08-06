import React, { useState } from 'react';
import MealWeek from '../../components/MealPlanner/MealWeek';
import SideBar from '../../components/Layout/Sider';
import store from '../../components/MealPlanner/data';
import WebsiteFooter from '../../components/Layout/Footer';

const MealPlanner = () => {
  const [data, setData] = useState(store);
  return (
    <div>
      <SideBar />
      <MealWeek />
      <WebsiteFooter />
    </div>
  );
};

export default MealPlanner;
