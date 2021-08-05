import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MPlanner from './MPlanner';
import './MPlanner.css';
import store from '../MealPlanner/data';
import ContextApi from './ContextApi';
import { Button } from 'antd';
import moment from 'moment';
import { LeftOutlined, RightOutlined, SaveFilled } from '@ant-design/icons';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    backgroundColor: '#fafafa',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
  },
  divvy: {
    width: '300px',
  },
}));

const daysMapper = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MealWeek = () => {
  const [data, setData] = useState(store);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState('08012021to08072021');
  const [currentData, setCurrentData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const classes = useStyle();
  const [plan, setPlan] = useState([]);

  const findThisWeek = () => {
    console.log(moment().format('YYYYMMDD'));
    const dateFormat = moment().format('DDMMYYYY');
    const today = moment().format('dddd').toLowerCase();
    console.log(today);
  };

  const handleSave = async () => {
    console.log('Saving Meal Planner');
    console.log('plan', plan);
    console.log('currentdata', currentData);
    let idx = 0;
    for (let el of plan) {
      if (el.dates === currentWeek) {
        console.log(idx);
        break;
      }
      idx++;
    }

    let dataToSend = [...plan];
    dataToSend[idx] = currentData;
    console.log('dataToSend', dataToSend);

    try {
      const resp = await axios({
        method: 'post',
        timeout: 1000,
        url: `/api/mealplanner/`,
        data: {
          mealplanner: dataToSend,
        },
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
      console.log('meal plan data', resp.data[0].weeks);
      console.log('store', store);
      if (resp.data[0].weeks.length === 0) {
        setPlan(store);
        setCurrentData(store[0]);
      } else {
        setPlan(resp.data[0].weeks);
        resp.data[0].weeks.find((value, idx) => {
          if (value.dates === currentWeek) {
            console.log('current val', value);
            setCurrentData(value);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('in Use Effect');
    findThisWeek();
    dataFetch();
    planFetch();
  }, []);

  const addMeal = (meal, listId, title) => {
    const newMeal = {
      ...meal,
    };
    const currentList = currentData.lists;
    const newMeals = {
      ...currentList[listId].meals,
      [title]: [...currentList[listId].meals[title], newMeal],
    };
    const newCurrentList = [...currentList];
    newCurrentList[listId] = {
      ...currentList[listId],
      meals: newMeals,
    };

    setCurrentData({
      ...currentData,
      lists: [...newCurrentList],
    });
  };

  const removeMeal = (listId, title, mealId) => {
    const currentList = currentData.lists;
    const mealList = currentList[listId].meals[title];
    const newMealList = mealList.filter((meal) => {
      return meal.recipeId !== mealId;
    });
    const newCurrentList = [...currentList];
    newCurrentList[listId] = {
      ...currentList[listId],
      meals: {
        ...currentList[listId].meals,
        [title]: newMealList,
      },
    };

    setCurrentData({
      ...currentData,
      lists: [...newCurrentList],
    });
  };

  const handleOnClickRight = () => {
    console.log('Clicked Right');
  };

  const handleOnClickLeft = () => {
    console.log('Clicked Left');
  };

  if (!currentData) {
    return null;
  } else {
    return (
      <ContextApi.Provider value={{ addMeal, removeMeal }}>
        {console.log('currentdata', currentData)}
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
            {currentData.lists.map((list, idx) => {
              return (
                <MPlanner
                  day={days[idx]}
                  list={list}
                  key={idx}
                  recipes={savedRecipes}
                />
              );
            })}
          </div>
        </div>
      </ContextApi.Provider>
    );
  }
};

export default MealWeek;
