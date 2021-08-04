import React from 'react';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Meal from './Meal';
import Add from './Add';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '270px',
    // backgroundColor: '#EBECF0',
    backgroundColor: '#fafcff',

    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const titleColor = {
  breakfast: '#85ad07',
  lunch: '#ba2065',
  dinner: '#260880',
};

const List = (props) => {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.root}>
        <CssBaseline />
        <Title
          className={classes.title}
          title={props.title}
          color={titleColor[props.title]}
        />
        {props.meals.map((meal) => {
          return <Meal meal={meal} listId={props.listId} title={props.title} />;
        })}
        <Add
          listId={props.listId}
          title={props.title}
          recipes={props.recipes}
        />
      </Paper>
    </div>
  );
};

export default List;
