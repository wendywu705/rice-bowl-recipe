import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MPlanner from './MPlanner';
import './MPlanner.css';
import store from '../MealPlanner/data';
import ContextApi from './ContextApi';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined, SaveFilled } from '@ant-design/icons';

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
  const [plan, setPlan] = useState([]);

  const handleSave = async () => {
    console.log('Saving Meal Planner');
    try {
      const resp = await axios({
        method: 'post',
        timeout: 1000,
        url: `/api/mealplanner/`,
      });
    } catch (err) {
      console.log(err);
    }
  };

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

  const planFetch = async () => {
    try {
      const resp = await axios({
        method: 'get',
        timeout: 1000,
        url: `/api/mealplanner/`,
      });
      console.log('meal plan data', resp.data[0].weeks[0]);
      setPlan(resp.data[0].weeks[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('in Use Effect');
    dataFetch();
    planFetch();
  }, []);

  const addMeal = (meal, listId, title) => {
    const newMeal = {
      recipeid: meal.recipeId,
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

  const handleOnClickRight = () => {
    console.log('Clicked Right');
  };

  const handleOnClickLeft = () => {
    console.log('Clicked Left');
  };

  return (
    <ContextApi.Provider value={{ addMeal, removeMeal }}>
      <div className="boxes">
        <h1>Meal Planner</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LeftOutlined
            style={{
              marginTop: '0.2em',
              marginRight: '0.5em',
              fontSize: '2em',
            }}
            onClick={handleOnClickLeft}
          />
          <h2 style={{ textAlign: 'center' }}>Aug 1, 2021 - Aug 7, 2021</h2>
          <RightOutlined
            style={{
              marginTop: '0.2em',
              marginLeft: '0.5em',
              fontSize: '2em',
            }}
            onClick={handleOnClickRight}
          />
        </div>
        <div
          style={{
            display: 'flex',
            marginBottom: '2em',
          }}
        >
          <Button
            style={{ marginRight: '1em' }}
            onClick={handleSave}
            type="primary"
          >
            Named Plans
          </Button>
          <Button
            style={{ marginRight: '2em' }}
            onClick={handleSave}
            type="primary"
          >
            Weekly Plans
          </Button>
          <Button
            style={{ marginLeft: '1em' }}
            onClick={handleSave}
            type="primary"
          >
            <SaveFilled />
            Save Plan
          </Button>
        </div>
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
