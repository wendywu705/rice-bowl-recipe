import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Button } from 'antd';
import MealAdder from './MealAdder';
import Popup from './Popup';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  addMeal: {
    padding: theme.spacing(1, 1, 1, 2),
    // margin: theme.spacing(0, 1, 1, 1),
    background: '#EBECF0',
    // '&:hover': {
    //   backgroundColor: fade('#000', 0.25),
    // },
  },
}));

const Add = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.addMeal} elevation={0}>
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <MealAdder />
        </Popup>
        <Button
          onClick={() => {
            setOpenPopup(true);
          }}
          style={{ width: '100%' }}
          type="primary"
          ghost
        >
          + Add a Meal
        </Button>
      </Paper>
    </div>
  );
};

export default Add;
