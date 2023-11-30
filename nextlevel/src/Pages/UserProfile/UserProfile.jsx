import React, { useState, useEffect } from 'react';
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
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



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
    const [teamID, setteamID] = useState('');
    const [userData, setUserData] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [sportName, setSportName] = useState('');
    const [rosterData, setRosterData] = useState(null); //for roster by teamID

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
            console.log("No sport");
            return;
        }
    
        sport = sport.toLowerCase();
        console.log(sport);
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



                    <Container maxWidth="md" className='all-of-sport-card' style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2%', alignItems: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Container maxWidth="sm" className='calender'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar />
                                </LocalizationProvider>
                            </Container>
                            <Container className='next-game' style={{display: 'flex', flexDirection: 'column'}}>
                                <section>Upcoming Game</section>
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
                    </Container>


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