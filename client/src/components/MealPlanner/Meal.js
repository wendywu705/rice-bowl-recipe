import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Tag, Divider } from 'antd';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'antd';

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
  return (
    <div>
      <Paper className={classes.meal}>
        <div className={classes.flexy}>
          <img
            className={classes.image}
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
            alt="food"
          />
          <div className={classes.food}>
            <Typography>{props.meal.name}</Typography>
            <Tag color="lime">{props.meal.category[0]}</Tag>

            <Typography>Prep: 25 min</Typography>
            <Typography>Cook: 25 min</Typography>
          </div>

          <CloseSquareTwoTone
            style={{
              marginLeft: 'auto',
              marginRight: 0,
              fontSize: '20px',
            }}
            onClick={() => {
              console.log('hello');
            }}
            twoToneColor="#eb2f96"
          />
          {/* <Button
            style={{
              height: '30px',
              width: '40px',
              marginLeft: 'auto',
              marginRight: 0,
            }}
            type="primary"
            danger
          >
            X
          </Button> */}
        </div>
      </Paper>
    </div>
  );
};

export default Meal;
