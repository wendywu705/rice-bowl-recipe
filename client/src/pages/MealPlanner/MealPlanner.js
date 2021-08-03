import React, { useState } from 'react';
import PageLayout from '../../components/Layout/Layout';
import MealWeek from '../../components/MealPlanner/MealWeek';
import store from '../../components/MealPlanner/data';

const MealPlanner = () => {
  const [data, setData] = useState(store);
  return (
    <div>
      <PageLayout />
      <MealWeek />
    </div>
  );
};

export default MealPlanner;
