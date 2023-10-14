import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#0B1519',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default function TopNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            NextLevel
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit" className={classes.button}>About</Button>
          <Button color="inherit" className={classes.button}>Services</Button>
          <Button color="inherit" className={classes.button}>Contact</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}