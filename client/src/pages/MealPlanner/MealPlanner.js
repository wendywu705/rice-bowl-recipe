import React, { useState } from 'react';
import MealWeek from '../../components/MealPlanner/MealWeek';
import SideBar from '../../components/Layout/Sider';
import store from '../../components/MealPlanner/data';

const MealPlanner = () => {
  const [data, setData] = useState(store);
  return (
    <div>
      <SideBar />
      <MealWeek />
    </div>
  );
};

export default MealPlanner;
