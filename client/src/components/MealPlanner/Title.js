import React, { useState } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
      {open ? (
        <div>
          <InputBase
            value="Lunch"
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={() => setOpen(!open)}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {titleCase(props.title)}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
};

export default Title;
