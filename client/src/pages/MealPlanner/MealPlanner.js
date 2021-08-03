import PageLayout from '../../components/Layout/Layout';
import React from 'react';
import MealWeek from '../../components/MealPlanner/MealWeek';

const MealPlanner = () => {
  return (
    <div>
      <PageLayout />
      <MealWeek />
    </div>
  );
};

export default MealPlanner;
