import { useCookies } from 'react-cookie';

function UserProfile() {
    const [cookies] = useCookies(['myCookie']);

    if (cookies.myCookie) {
        // do something if the cookie exists
    } else {
        // do something else if the cookie doesn't exist
    }

    return (
        // your component JSX
        <div>
            <h1>User Profile</h1>
            <p>Welcome to your user profile!</p>
        </div>
    );
}
export default UserProfile;