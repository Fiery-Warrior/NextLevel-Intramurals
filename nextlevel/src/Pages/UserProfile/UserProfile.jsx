import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import CardDesign from './CardDesign';
import { Typography } from '@material-ui/core';
import UserNavBar from '../LandingPage/NavBar/UserNavBar';

function UserProfile() {
    const [cookies] = useCookies(['myCookie']);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (cookies.myCookie && !email) {
            setEmail(cookies.myCookie.email);
        }
    }, [cookies, email]);

    useEffect(() => {
        fetch(`http://localhost:3001/userprofile/${email}`)
            .then(response => response.json())
            .then(data => setUserData(data[0])); // assuming the response is an array
    }, [email]);

    return (
        <div>
            <UserNavBar/>
            {/* <Typography variant="h4">{email} Profile</Typography> */}
            <br/>
            <Typography variant="h3">Welcome to your profile, {userData && userData.firstName}!</Typography>

            <h2>Feel Free to choose from some of these clubs nearby</h2>
            
            {/* {userData && (
                <div>
                    <Typography variant="body1">Name: {userData.firstName} {userData.lastName}</Typography>
                    <Typography variant="body1">Role: {userData.role}</Typography>
                    <Typography variant="body1">Student ID: {userData.stuID}</Typography>
                    <Typography variant="body1">Sex: {userData.sex}</Typography>
                    <Typography variant="body1">Team: {userData.TeamName}</Typography>
                    <Typography variant="body1">Sport: {userData.sportName}</Typography>
                </div>
            )} */}
            <br/>
            <br/>
            <br/>
            <CardDesign/>
        </div>
    );
}

export default UserProfile;