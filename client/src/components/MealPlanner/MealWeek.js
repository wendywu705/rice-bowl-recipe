import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MPlanner from './MPlanner';
import './MPlanner.css';
import store from '../MealPlanner/data';
import blank from '../MealPlanner/blank';
import ContextApi from './ContextApi';
import { Button } from 'antd';
import moment from 'moment';
import { LeftOutlined, RightOutlined, SaveFilled } from '@ant-design/icons';
import '../Layout/Footer.css';

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
  const [currentWeek, setCurrentWeek] = useState('08/01/2021to08/07/2021');
  const [currentData, setCurrentData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const classes = useStyle();
  const [plan, setPlan] = useState([]);

  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const getThisWeek = () => {
    const currentDate = moment().format('L');
    const currentThing = moment().format('dddd').toLowerCase();
    const startDate = moment(currentDate)
      .subtract(daysMapper[currentThing], 'days')
      .format('L');
    const endDate = moment(startDate).add(6, 'days').format('L');
    const thisWeek = startDate + 'to' + endDate;
    return thisWeek;
  };

  const newFindWeek = (direction, currentWeek) => {
    let parsedDates = currentWeek.split('to');
    let startDate = parsedDates[0];
    let endDate = parsedDates[1];
    let newStartDate;
    let newEndDate;
    if (direction === 'right') {
      newStartDate = moment(startDate).add(7, 'days').format('L');
      newEndDate = moment(endDate).add(7, 'days').format('L');
    } else {
      newStartDate = moment(startDate).subtract(7, 'days').format('L');
      newEndDate = moment(endDate).subtract(7, 'days').format('L');
    }

    return newStartDate + 'to' + newEndDate;
  };

  const parseWeek = (currentWeek) => {
    let parsedDates = currentWeek.split('to');
    return parsedDates[0] + ' to ' + parsedDates[1];
  };

  const handleSave = async () => {
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
      setSavedRecipes(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const planFetch = async () => {
    let found = false;
    try {
      const resp = await axios({
        method: 'get',
        timeout: 1000,
        url: `/api/mealplanner/`,
      });
      if (resp.data[0].weeks.length === 0) {
        setPlan(store);
        if (!loaded) {
          setLoaded(true);
          setCurrentWeek(getThisWeek());
        }
      } else {
        setPlan(resp.data[0].weeks);
        resp.data[0].weeks.find((value, idx) => {
          if (value.dates === currentWeek) {
            setCurrentData(value);
            found = true;
          }
        });
      }
      if (!found) {
        // Do this
        let newData = blank;
        newData.dates = getThisWeek();
        setCurrentData(newData);
        if (!loaded) {
          setLoaded(true);
          setCurrentWeek(getThisWeek());
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataFetch();
    planFetch();
  }, [currentWeek]);

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
    const newDate = newFindWeek('right', currentWeek);
    setCurrentWeek(newDate);
  };

  const handleOnClickLeft = () => {
    const newDate = newFindWeek('left', currentWeek);
    setCurrentWeek(newDate);
  };

  if (!currentData) {
    return null;
  } else {
    return (
      <ContextApi.Provider value={{ addMeal, removeMeal }}>
        {console.log('currentdata', currentData)}
        <div className="boxes" id="pageContainer">
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
            <h2 style={{ textAlign: 'center' }}>{parseWeek(currentWeek)}</h2>
            {/* <h2 style={{ textAlign: 'center' }}>Aug 1, 2021 - Aug 7, 2021</h2> */}
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
