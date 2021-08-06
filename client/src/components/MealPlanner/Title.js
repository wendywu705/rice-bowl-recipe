import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
}));

const Title = (props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const titleCase = (str) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <div style={{ marginTop: '1em' }}>
      <div className={classes.editableTitleContainer}>
        <Typography
          style={{ color: props.color, textAlign: 'center' }}
          // onClick={() => setOpen(!open)}
          className={classes.editableTitle}
        >
          {titleCase(props.title)}
        </Typography>
      </div>
    </div>
  );
};

export default Title;
