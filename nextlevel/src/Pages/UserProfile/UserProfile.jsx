import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

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
        // your component JSX
        <div>
            <h1>User Profile</h1>
            <p>Welcome to your profile, {email}!</p>
        </div>
    );
}
export default UserProfile;