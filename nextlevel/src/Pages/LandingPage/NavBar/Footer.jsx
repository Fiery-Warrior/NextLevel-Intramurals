import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#0B1519',
    color: 'white',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  link: {
    color: 'white',
    marginLeft: theme.spacing(2),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1">
            Email: <Link href="mailto:nextlevelintramurals@gmail.com" className={classes.link}>nextlevelintramurals@gmail.com</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Follow Us</Typography>
          <Link href="#" className={classes.link}><InstagramIcon /></Link>
          <Link href="#" className={classes.link}><YouTubeIcon /></Link>
        </Grid>
      </Grid>
    </div>
  );
}