import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MPlanner from './MPlanner';
import './MPlanner.css';
import List from './List';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '320px',
    backgroundColor: '#fafafa',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
  },
  divvy: {
    width: '320px',
  },
}));

const MealWeek = () => {
  const classes = useStyle();

  return (
    <div className="boxes">
      <h1>Meal Planner</h1>
      <div style={{ display: 'flex' }}>
        <MPlanner day="Sunday" />
        <MPlanner day="Monday" />
        <MPlanner day="Tuesday" />
        <MPlanner day="Wednesday" />
        <MPlanner day="Thursday" />
        <MPlanner day="Friday" />
        <MPlanner day="Saturday" />
      </div>
    </div>
  );
};

export default MealWeek;
