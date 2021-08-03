import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Tag, Divider } from 'antd';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

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

const Meal = () => {
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
          <Typography className={classes.food}>
            Butternut Squash Soup
          </Typography>
        </div>
        <Tag className={classes.prep} color="lime">
          Lightdish
        </Tag>

        <Typography className={classes.prep}>Prep: 25 min</Typography>
      </Paper>
    </div>
  );
};

export default Meal;
