import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
//import './admindash2.jsx/index.js';
import Users from './Users.jsx';
import Game from './Game';
import Teams from './Teams';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AdminDash() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTeams, setTotalTeams] = useState(0);
    const [totalSports, setTotalSports] = useState(0);
    const [currentPage, setCurrentPage] = useState('Users');

    const getUserCount = async() => {
        try{
            const response = await axios.get('http://localhost:3001/getUserCount');
            setTotalUsers(response.data.userCount);
        } catch(error){
            console.log(`There was an error retrieving the user count: ${error}`)
        }
    }
    const getTeamCount = async() => {
        try{
            const response = await axios.get('http://localhost:3001/getTeamCount');
            setTotalTeams(response.data.teamCount);
        } catch(error){
            console.log(`There was an error retrieving the team count: ${error}`)
        }
    }
    const getSportCount = async() => {
        try{
            const response = await axios.get('http://localhost:3001/getSportCount');
            setTotalSports(response.data.sportCount);
        } catch(error){
            console.log(`There was an error retrieving the sport count: ${error}`)
        }
    }

    
  const renderPage = () => {
    switch(currentPage) {
      case 'Users':
        return <Users />;
      case 'Game':
        return <Game />;
      case 'Teams':
        return <Teams />;
      default:
        return <Users />;
    }
  };

    useEffect(() => {
        getUserCount();
        getTeamCount();
        getSportCount();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


 

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={open ? classes.appBarShift : classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={open ? classes.hide : classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={open ? classes.drawerOpen : classes.drawerClose}
                classes={{
                    paper: open ? classes.drawerOpen : classes.drawerClose,
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItem button onClick={() => setCurrentPage('Users')}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button onClick={() => setCurrentPage('Game')}>
                        <ListItemIcon>
                            <ScoreboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItem>
                    <ListItem button onClick={() => setCurrentPage('Teams')}>
                        <ListItemIcon>
                            <Diversity3Icon />
                        </ListItemIcon>
                        <ListItemText primary="Teams" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" onClick={() => {window.location.href = '/'}}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Total Users
                        </Typography>
                        <Typography color="textSecondary">
                            
                            {totalUsers}
                        </Typography>
                    </CardContent>
                </Card>
                <div className='card-space'/>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Total Teams
                        </Typography>
                        <Typography color="textSecondary">
                            {totalTeams}
                        </Typography>
                    </CardContent>
                </Card>
                <div className='card-space'/>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Total Sports
                        </Typography>
                        <Typography color="textSecondary">
                            {totalSports}
                        </Typography>
                    </CardContent>
                </Card>
                <div className='card-space'/>
                {renderPage()}
            </main>        
            </div>
    );
}

export default AdminDash;
