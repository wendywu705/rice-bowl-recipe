import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './MPlanner.css';
import List from './List';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '280px',
    backgroundColor: '#fafafa',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
  },
  divvy: {
    width: '320px',
  },
}));

const MPlanner = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.divvy}>
      <h2 className={classes.center}>{props.day}</h2>
      <Paper className={classes.root}>
        {Object.keys(props.list.meals).map(function (key, index) {
          return <List title={key} />;
        })}

        {/* <List title="Breakfast" />
        <List title="Lunch" />
        <List title="Dinner" /> */}
      </Paper>
    </div>
  );
};

export default MPlanner;
