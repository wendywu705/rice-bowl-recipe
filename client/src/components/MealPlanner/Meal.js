import React, { useContext } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Tag } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import ContextApi from './ContextApi';
import { Link } from 'react-router-dom';

import { CloseSquareTwoTone } from '@ant-design/icons';

const useStyle = makeStyles((theme) => ({
  meal: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  image: {
    width: '30px',
    height: '30px',
  },
  flexy: {
    display: 'flex',
  },
  food: {
    marginLeft: '1em',
    padding: 0,
  },
  prep: {
    marginLeft: '3em',
  },
}));

const Meal = (props) => {
  const classes = useStyle();

  const { removeMeal } = useContext(ContextApi);
  const handleOnClose = () => {
    console.log(props.listId, props.title, props.meal.recipeId);
    removeMeal(props.listId, props.title, props.meal.recipeId);
  };
  return (
    <div>
      <Paper className={classes.meal}>
        <div className={classes.flexy}>
          <img className={classes.image} src={props.meal.imageUrl} alt="food" />
          <div className={classes.food}>
            <Typography style={{ fontWeight: 'bold' }}>
              <Link to={`/recipe/${props.meal.recipeId}`}>
                {props.meal.name}
              </Link>
            </Typography>
            <div style={{ display: 'flex' }}>
              {props.meal.category.map((cat) => {
                return <Tag color="blue">{cat}</Tag>;
              })}
            </div>

            <Typography>Prep: {props.meal.time.prepHour} hours</Typography>
            <Typography>Cook: {props.meal.time.cookHour} hours</Typography>
          </div>

          <CloseSquareTwoTone
            style={{
              marginLeft: 'auto',
              marginRight: '0',
              fontSize: '20px',
            }}
            onClick={handleOnClose}
            twoToneColor="#eb2f96"
          />
        </div>
      </Paper>
    </div>
  );
};

export default Meal;
