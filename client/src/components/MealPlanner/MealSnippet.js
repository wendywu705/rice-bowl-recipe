import React, { useContext } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Button } from 'antd';
import { Tag } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import ContextApi from './ContextApi';

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

const MealSnippet = ({ setOpenPopup, listId, title, recipe }) => {
  const classes = useStyle();
  const { addMeal } = useContext(ContextApi);
  const handleOnClick = () => {
    addMeal(recipe, listId, title);
    setOpenPopup(false);
  };

  return (
    <div>
      <Paper elevation={1} style={{ marginBottom: '10px' }}>
        <div>
          <div className={classes.flexy}>
            <img className={classes.image} src={recipe.imageUrl} alt="food" />
            <div className={classes.prep}>
              <Typography className={classes.food}>{recipe.name}</Typography>
              <div style={{ display: 'flex' }}>
                {recipe.category.map((cate) => {
                  return <Tag color="blue">{cate}</Tag>;
                })}
                <Tag color="lime">Homemade</Tag>
              </div>

              <Typography>Prep: {recipe.time.prepHour} hours</Typography>
              <Typography>Cook: {recipe.time.cookHour} hours</Typography>
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
