import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from 'react-cookie';
import Keagan from './Keagan.jpg';
import './usernavbar.css';
import { TextField } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (cookies.myCookie && !email) {
      setEmail(cookies.myCookie.email);
    }
  }, [cookies, email]);

  useEffect(() => {
    fetch(`https://1zsncd03-3001.usw3.devtunnels.ms/userprofile/${email}`)
      .then((response) => response.json())
      .then((data) => setUserData(data[0])); 
  }, [email]);



  useEffect(() => {
    if (searchTerm) {
      fetch(`https://1zsncd03-3001.usw3.devtunnels.ms/teams-sports?search=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data)); 
    }
  }, [searchTerm]);


  const roleNames = {
    1: 'Player',
    2: 'Captain',
    3: 'Admin',
    4: 'Superadmin'
  };
  

  // const handleJoinTeam = (teamName) => {
  //   fetch('https://1zsncd03-3001.usw3.devtunnels.ms/join-team', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userEmail: email, teamName }),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Handle the response
  //   });
  // };

  const handleJoinTeam = (teamName) => {
    fetch('https://1zsncd03-3001.usw3.devtunnels.ms/join-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail: email, teamName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response
        if (data.success) {
          // User successfully joined the team
          console.log('User successfully joined the team');
        } else {
          // Error joining the team
          console.error(data.error);
        }
      });
  };
  


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
     

<TextField 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search by team or sport"
  style={{ marginLeft: '10px', marginTop: '20px'}}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
  className="search-input"
/>
{/* {searchTerm && (
  <div className="dropdown-menu">
    {searchResults.length > 0 ? (
      <div>
        {searchResults.filter(result => result.toLowerCase().includes(searchTerm.toLowerCase())).map((result) => (
          <p className="dropdown-item" key={result}>{result}</p>
        ))}
      </div>
    ) : (
      <p>No results found.</p>
    )}
  </div>
)} */}
      {searchTerm && (
        <div className="dropdown-menu">
          {searchResults.length > 0 ? (
            <div>
              {searchResults.filter(result => result.toLowerCase().includes(searchTerm.toLowerCase())).map((result) => (
                <div key={result}>
                  <p className="dropdown-item">{result}</p>
                  <button onClick={() => handleJoinTeam(result)}>+</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}


            <Button color="inherit" href="/"  style={{ fontSize: '25px', paddingTop: '8%'  }}>
              <HomeIcon style ={{fontSize:50, color: 'Black'}} />
            </Button>

            <Tooltip
              title={
                <div>
                  <Typography variant="body1" style={{ marginTop: '5%'}}>
                    Name: {userData && `${userData.firstName} ${userData.lastName}`}
                  </Typography>
                  <Typography variant="body1">Student ID: {userData && userData.stuID}</Typography>
                  <Typography variant="body1">Sex: {userData && userData.sex}</Typography>
                  {/* <Typography variant="body1">Role: {userData && userData.role}</Typography> */}
                  <Typography variant="body1">Role: {userData && roleNames[userData.role]}</Typography>
                  <Typography variant="body1">
                    Team: {userData ? userData.TeamName : 'Choose Now'}
                  </Typography>
                  <Typography variant="body1">
                    Sport: {userData ? userData.sportName : 'Join one now'}
                  </Typography>
                  <Button color="primary" variant="contained" className={classes.button} onClick={handleLogout} style={{ fontSize: '10px', padding: '5%', marginTop: '10%'}}>
                    Logout
                  </Button>
                </div>
              }
            >
              <Avatar alt={userData && userData.firstName} src={Keagan} className={classes.avatar} />
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

