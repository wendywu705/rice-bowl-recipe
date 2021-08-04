import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MPlanner from './MPlanner';
import './MPlanner.css';
import List from './List';
import store from '../MealPlanner/data';
import ContextApi from './ContextApi';

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
  const [data, setData] = useState(store);
  const classes = useStyle();

  const addMeal = (title) => {
    console.log('Meal:', title);
  };

  return (
    <ContextApi.Provider value={{ addMeal }}>
      <div className="boxes">
        <h1>Meal Planner</h1>
        <div style={{ display: 'flex' }}>
          {data.listsIdx.map((listIdx) => {
            const list = data.lists[listIdx];
            return <MPlanner day={list.title} list={list} key={listIdx} />;
          })}
        </div>
      </div>
    </ContextApi.Provider>
  );
};

export default MealWeek;
