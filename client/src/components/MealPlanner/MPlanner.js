import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './MPlanner.css';
import List from './List';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '260px',
    // backgroundColor: '#fafafa',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
    color: '#002699',
  },
  divvy: {
    width: '300px',
  },
  today: {
    color: '#ffdb4d',
  },
}));

const MPlanner = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.divvy}>
      <h2 className={classes.center} style={{paddingTop:20, marginBottom:0}}>{props.day}</h2>
      <div style={{display:'flex'}}>
        {Object.keys(props.list.meals).map(function (key, index) {
          return (
            <List
              title={key}
              meals={props.list.meals[key]}
              listId={props.list.listId}
              recipes={props.recipes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MPlanner;
