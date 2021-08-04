import React, { useContext } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Button } from 'antd';
import { Tag } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import ContextApi from './ContextApi';
import CloseSquareTwoTone from '@ant-design/icons';

const useStyle = makeStyles((theme) => ({
  meal: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
  image: {
    width: '70px',
    height: '70px',
  },
  flexy: {
    display: 'flex',
  },
  food: {
    padding: 0,
  },
  prep: {
    marginLeft: '1em',
  },
}));

const MealSnippet = () => {
  const classes = useStyle();
  const { addMeal } = useContext(ContextApi);
  const handleOnClick = () => {
    addMeal('Delicious Food');
  };

  return (
    <div>
      <Paper elevation={1} style={{ marginBottom: '10px' }}>
        <div>
          <div className={classes.flexy}>
            <img
              className={classes.image}
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563"
              alt="food"
            />
            <div className={classes.prep}>
              <Typography className={classes.food}>Delicious Food</Typography>
              <Tag color="lime">Homemade</Tag>

              <Typography>Prep: 25 min</Typography>
              <Typography>Cook: 25 min</Typography>
            </div>
            <Button
              style={{ maxHeight: '100px', marginLeft: 'auto', marginRight: 0 }}
              // variant="contained"
              // color="primary"
              type="primary"
              onClick={handleOnClick}
            >
              + Add
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default MealSnippet;
