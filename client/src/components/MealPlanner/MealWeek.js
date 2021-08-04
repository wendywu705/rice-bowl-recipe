import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
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
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [mealData, setMealData] = useState(null);
  const classes = useStyle();

  const dataFetch = async () => {
    try {
      const resp = await axios({
        method: 'get',
        timeout: 1000,
        url: `/saved/`,
      });
      console.log('first data', resp.data);
      setSavedRecipes(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('in Use Effect');
    dataFetch();
  }, []);

  const addMeal = (meal, listId, title) => {
    const newMealId = uuid();
    const newMeal = {
      recipeid: newMealId,
      ...meal,
    };
    const dataList = data.lists;
    const newMeals = {
      ...dataList[listId].meals,
      [title]: [...dataList[listId].meals[title], newMeal],
    };
    const newdataList = {
      ...dataList,
      [listId]: {
        ...dataList[listId],
        meals: { ...newMeals },
      },
    };

    setData({
      ...data,
      lists: { ...newdataList },
    });
  };

  const removeMeal = (listId, title, mealId) => {
    console.log(listId, title, mealId);
    const dataList = data.lists;
    const mealList = dataList[listId].meals[title];
    const newMealList = mealList.filter((meal) => {
      return meal.recipeid !== mealId;
    });
    const newdataList = {
      ...dataList,
      [listId]: {
        ...dataList[listId],
        meals: {
          ...dataList[listId].meals,
          [title]: newMealList,
        },
      },
    };

    setData({
      ...data,
      lists: { ...newdataList },
    });

    console.log('MealList', mealList);
    console.log('newMealList', newMealList);
    console.log('newDataList', newdataList);
  };

  return (
    <ContextApi.Provider value={{ addMeal, removeMeal }}>
      <div className="boxes">
        <h1>Meal Planner</h1>
        <h2 style={{ textAlign: 'center' }}>Aug 1, 2021 - Aug 7, 2021</h2>
        <div style={{ display: 'flex' }}>
          {data.listsIdx.map((listIdx) => {
            const list = data.lists[listIdx];
            return (
              <MPlanner
                day={list.title}
                list={list}
                key={listIdx}
                recipes={savedRecipes}
              />
            );
          })}
        </div>
      </div>
    </ContextApi.Provider>
  );
};

export default MealWeek;
