import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  meal: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}));

const Meal = () => {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.meal}>Butternut Squash Soup</Paper>
    </div>
  );
};

export default Meal;
