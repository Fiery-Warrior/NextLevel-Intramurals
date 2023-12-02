import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#4b6d7b',
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
            Next Level Intramurals
          </Typography>
          <div>
            <Button color="inherit" href = "/">Home</Button>
            <Button color="inherit" className={classes.button} >About</Button>
            <Button color="inherit" className={classes.button} href='/login'>Login</Button>
            <Button color="inherit" className={classes.button} href='/contactpage'>Contact</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}