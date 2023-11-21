import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from 'react-cookie';
import Keagan from './Keagan.jpg';
import './usernavbar.css';


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
    marginLeft: theme.spacing(1.5),
  },
  avatar: {
    width: theme.spacing(8.5),
    height: theme.spacing(8.5),
  },
}));

export default function UserNavBar() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['myCookie']);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (cookies.myCookie && !email) {
      setEmail(cookies.myCookie.email);
    }
  }, [cookies, email]);

  useEffect(() => {
    fetch(`http://localhost:3001/userprofile/${email}`)
      .then((response) => response.json())
      .then((data) => setUserData(data[0])); 
  }, [email]);


  const handleLogout = () => {
    removeCookie('myCookie'); // remove the cookie
    window.location.href = '/login'; // redirect to login
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{ visibility: 'hidden' }}>
            NextLevel
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" href="/"  style={{ fontSize: '25px', paddingTop: '8%'  }}>
              Home
            </Button>
            <Button color="inherit" className={classes.button} href="/teamselection"  style={{ fontSize: '25px', paddingTop: '8%'  }}>
              Teams
            </Button>
            {/* <Button color="inherit" className={classes.button} href="/login"  style={{ fontSize: '25px', paddingTop: '8%' }}>
              Logout
            </Button> */}
            <Button color="inherit" className={classes.button} onClick={handleLogout} style={{ fontSize: '25px', paddingTop: '8%' }}>
              Logout
            </Button>
            <Tooltip
              title={
                <div>
                  <Typography variant="body1">
                    Name: {userData && `${userData.firstName} ${userData.lastName}`}
                  </Typography>
                  <Typography variant="body1">Student ID: {userData && userData.stuID}</Typography>
                  <Typography variant="body1">Sex: {userData && userData.sex}</Typography>
                  <Typography variant="body1">
                    Team: {userData ? userData.TeamName : 'Choose Now'}
                  </Typography>
                  <Typography variant="body1">
                    Sport: {userData ? userData.sportName : 'Join one now'}
                  </Typography>
                </div>
              }
            >
              {/* <Avatar alt={userData && userData.firstName} src={Keagan} className={classes.button} /> */}
              <Avatar alt={userData && userData.firstName} src={Keagan} className={classes.avatar} />
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

