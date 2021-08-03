import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  addMeal: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#EBECF0',
    // '&:hover': {
    //   backgroundColor: fade('#000', 0.25),
    // },
  },
}));

const Add = () => {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.addMeal} elevation={0}>
        <Button variant="outlined" color="primary">
          + Add a Meal
        </Button>
      </Paper>
    </div>
  );
};

export default Add;
