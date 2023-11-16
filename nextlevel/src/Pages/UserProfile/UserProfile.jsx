import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import CardDesign from './CardDesign';
import { Typography } from '@material-ui/core';
import UserNavBar from '../LandingPage/NavBar/UserNavBar';
import Container from '@mui/material/Container';
import './userprofile.css';
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
                setUserData(data[0]); // assuming the response is an array
                setTeamName(data[0].TeamName); // assuming the response has a TeamName property
                setSportName(data[0].sportName);
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


                    <Container maxWidth="md" className='sport-card' style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Container maxWidth="sm" className='calender'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar />
                            </LocalizationProvider>
                        </Container>
                        <Container maxWidth="sm">
                            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="/static/images/football.png"
                                    title="Sport Card"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {teamName} 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {sportName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {handleOpen(); handleRosterClick();}}>Roster</Button>
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
                                </CardActions>
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