import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'; // import useCookies hook
import CardDesign from './CardDesign';

function UserProfile() {
    const [cookies] = useCookies(['myCookie']);
    const [email, setEmail] = useState('');
    console.log('Cookie is: ', cookies);
    console.log('email is: ', email);
    useEffect(() => {
        if (cookies.myCookie && !email) { // add a check to see if email state has already been set
            setEmail(cookies.myCookie.email);
        }
    }, [cookies, email]); // add email state to dependency array

    return (
        <div>
            <h1>{email} Profile</h1>
            <h1>Welcome to your profile, {email}!</h1>
            <CardDesign/>
        </div>
    );

}

export default UserProfile;

