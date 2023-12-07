import React, { useState, useEffect, useRef} from 'react';
import { useCookies } from 'react-cookie';
import CardDesign from './CardDesign';
import { Typography } from '@material-ui/core';
import UserNavBar from '../LandingPage/NavBar/UserNavBar';
import './userprofile.css';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function UserProfile() {
    const [cookies] = useCookies(['myCookie']);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [sportName, setSportName] = useState('');
    const [rosterData, setRosterData] = useState(null); //for roster by teamID
    const [games, setGames] = useState([]); 
    const [interestedUsers, setInterestedUsers] = useState([]);


    const highlightedElements = useRef(null);




    //Modal
    const [open, setOpen] = React.useState(false);
    const [rosterClicked, setRosterClicked] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRosterClick = () => setRosterClicked(true);


    //sport image chooser
    //this '?' checks to make sure that sportname is not null
    const userSport = sportName ? sportName.toLowerCase() : null;
    
    const getSportImage = (sport) => {
        if (!sport) {
            return;
        }
    
        sport = sport.toLowerCase();
        switch(sport) {
            case 'football':
                return "/static/images/football.png";
            case 'basketball':
                return "/static/images/basketball.jpg";
            case 'soccer':
                return "/static/images/soccer.png";
            case 'hockey':
                return "/static/images/hockey.png";
            case 'tennis':
                return "/static/images/tennis.jpg";
            case 'softball':
                return "/static/images/softball.jpg";
            case 'volleyball':
                return "/static/images/volleyball.jpg";
            case 'table tennis':
                return "/static/images/tabletennis.jpg";   
            default:
                return "/static/images/default.png"; // default image
        }
    }

    
    useEffect(() => {
        if (cookies.myCookie && !email) {
            setEmail(cookies.myCookie.email);
        }
    }, [cookies, email]);


    useEffect(() => { 
        fetch(`http://localhost:3001/userprofile/${email}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setUserData(data[0]);
                    setTeamName(data[0].TeamName);
                    setSportName(data[0].sportName);
                } else {
                    console.error('Invalid response data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }, [email]);

    useEffect(() => {
        if (teamName) {
            // Only proceed if teamName is available
            fetch("http://localhost:3001/showGames", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamName }) // Sending teamName in the request body
            })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set the time to the start of the day
    
                    const upcomingGames = data
                        .filter(game => {
                            const gameDate = new Date(game.date);
                            gameDate.setHours(0, 0, 0, 0); // Set the time to the start of the day for comparison
                            return gameDate >= today; // Include games today and in the future
                        })
                        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
    
                    setGames(upcomingGames); // Update the state with the filtered and sorted games
                } else {
                    console.error('Invalid response data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
        }
    }, [teamName])


    async function fetchInterest() {
        if (teamName) {
            try {
                const response = await axios.post('http://localhost:3001/getInterest', { email });
                setInterestedUsers(response.data);
            } catch (error) {
                console.log("error retrieving interested users.");
            }
        }
    }
    useEffect(() => {
        // const fetchData = async () => {
        //     if (teamName) {
        //         try {
        //             const response = await axios.post('http://localhost:3001/getInterest', { email });
        //             setInterestedUsers(response.data);
        //             console.log(interestedUsers);
        //         } catch (error) {
        //             console.log("error retrieving interested users.");
        //         }
        //     }
        // };
    
        // fetchData();
        fetchInterest();
    }, [teamName]);


    const nearestUpcomingGame = games.length > 0 ? games[0] : null;
    const [teamMembers, setTeamMembers] = useState([]);
    useEffect(() => {
        if (teamName) {
            fetch(`http://localhost:3001/team/${teamName}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setTeamMembers(data);
                    } else {
                        console.error('Invalid response data:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching team members:', error);
                });
        }
    }, [teamName]); // This will run whenever teamName changes /each user profile

    const addUserToTeam = async (clickedUserId) => {
        const stuID = clickedUserId;
        const TeamName = teamName;
        try {
            await axios.post('http://localhost:3001/addusertoteam', { stuID, TeamName});
            alert('User added to team!');
            fetchInterest();

        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user to team');
        }
    };
      
    return (
        <div>
            <UserNavBar/>
            {/* <Typography variant="h4">{email} Profile</Typography>  */}


            {teamName ? (
                <React.Fragment>
                    {/* <Typography variant="h3">Welcome to your team, {teamName}!</Typography>
                    <h2>You are part of {teamName}</h2> */}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <br/>
                    <Typography variant="h3">Welcome to your profile, {userData && userData.firstName}!</Typography>
                    <h2>Feel Free to choose from some of these clubs nearby</h2>
                    <br/>
                </React.Fragment>
            )}



            {teamName && (
                <div>
   
                    <h1 className="activity-cards-title-central">Activity Central</h1>


        <Grid container spacing={2}>
            <Grid item xs={6}>




                <Container maxWidth="md" className='all-of-sport-card' style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2%', marginTop: '5%' ,alignItems: 'center', minWidth: '800px', minHeight: '300px' }}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Container maxWidth="sm" className='calender'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar />
                                </LocalizationProvider>
                            </Container>
                            <Container className='next-game' style={{display: 'flex', flexDirection: 'column'}}>
                                <section>Upcoming Game</section>
                                    {nearestUpcomingGame && (
                                        <div>
                                            <p>Date: {new Date(nearestUpcomingGame.date).toLocaleDateString()}</p>
                                            <p>Match: {nearestUpcomingGame['Your Team']} vs {nearestUpcomingGame['Opposing Team']}</p>
                                            <p>Location: {nearestUpcomingGame.location}</p>
                                        </div>
                                    )}
                            </Container>
                        </div>
                        <Container maxWidth="sm" style={{marginLeft: '2%'}} className='sport-card'>
                            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    //image="/static/images/football.png"
                                    image={getSportImage(userSport)}
                                    title="Sport Card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                        {teamName} | {sportName}
                                    </Typography>

                                        <Typography variant="h5" component="h2">
                                            <Button onClick={handleOpen}> Player Roster</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        <h2>{teamName} Roster</h2>
                                                        {teamMembers.map(member => (
                                                            <p key={member.id}>{member.firstName} {member.lastName}</p>
                                                        ))}
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </Typography>

                                </CardContent>
                            </Card>
                        </Container>
                        <Container className="schedule">
                            <Card sx={{ maxWidth: 10000, minWidth: 345 }}>
                                    <CardContent>
                                        <Typography variant="h4">Your Schedule</Typography>
                                        <ul>
                                            {games.map(game => (
                                                <li key={game.gameID}>
                                                {game['Your Team']} vs {game['Opposing Team']} - {new Date(game.date).toLocaleDateString()}, {game.location}, Score: {game['Your Team Score']} - {game['Opposing Team Score']}
                                                </li>
                                            ))}
                                        </ul>
                                        <Typography variant="h5" component="h2">
                                            <Button onClick={handleOpen}> View all games</Button>
                                        </Typography>
                                    </CardContent>
                            </Card>
                        </Container>
                    </Container>
            </Grid>
            <Grid item xs={6}>
         
<Container maxWidth="md" className='widget' style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2%', alignItems: 'center', width: 300, height: 200, maxWidth: '500px', maxHeight: '300px' }}>
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Container maxWidth="md" className='widget' style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2%', alignItems: 'center'}}>
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className='widget' sx={{ maxWidth: 345, minWidth: 345, marginLeft: '2%', marginTop: '5%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{fontWeight: 'bold'}}>
                                    Team Requests:
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" >
                                {interestedUsers.map(user => (
                                    <div key={user.stuID} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <p>{user.firstName} {user.lastName}</p>
                                        <Button onClick={() => addUserToTeam(user.stuID)} variant="contained" color="primary" style={{fontWeight: 'bold'}}>
                                            +
                                        </Button>
                                    </div>
                                ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <br/>
                <br/>
            </div>
                </Container>
            </Grid>
        </Grid>

                    
                    <br/>
                    <br/>
                </div>
            )}
        <br/>
            <CardDesign/>


        </div>
    );
}

export default UserProfile;