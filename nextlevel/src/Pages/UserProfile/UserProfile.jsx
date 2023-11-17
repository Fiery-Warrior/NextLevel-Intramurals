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

function UserProfile() {
    const [cookies] = useCookies(['myCookie']);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [sportName, setSportName] = useState('');

    //Modal
    const [open, setOpen] = React.useState(false);
    const [rosterClicked, setRosterClicked] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRosterClick = () => setRosterClicked(true);

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

    return (
        <div>
            <UserNavBar/>
            {/* <Typography variant="h4">{email} Profile</Typography> */}
            <br/>
            <Typography variant="h3">Welcome to your profile, {userData && userData.firstName}!</Typography>


            <h2>Feel Free to choose from some of these clubs nearby</h2>
            

            <br/>
            {teamName && (
                <div>
                    <h1 className="activity-cards-title">Activity Central</h1>




                    <Container maxWidth="md" className='all-of-sport-card' style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '2%', alignItems: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Container maxWidth="sm" className='calender'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar />
                                </LocalizationProvider>
                            </Container>
                            <Container className='next-game' style={{display: 'flex', flexDirection: 'column'}}>
                                <section>Name Game</section>
                            </Container>
                        </div>
                        <Container maxWidth="sm" style={{marginLeft: '2%'}} className='sport-card'>
                            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 180 }}
                                    image="/static/images/football.png"
                                    title="Sport Card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                        {teamName} | {sportName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                    <Button size="large" className='roster-modal' onClick={() => {handleOpen(); handleRosterClick();}}>Roster</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        {rosterClicked ? (
                                            <div>
                                                <Typography variant="h5" component="h2">
                                                    Success!
                                                </Typography>
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography variant="h5" component="h2">
                                                    Roster
                                                </Typography>
                                            </div>
                                        )}
                                    </Modal>
                                    </Typography>
                                </CardContent>
                                {/* <CardActions>
            
                                </CardActions> */}
                            </Card>
                        </Container>
                    </Container>


                    <br/>
                    <br/>
                </div>
            )}

            <CardDesign/>
        </div>
    );
}

export default UserProfile;