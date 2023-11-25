import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotUser = () => {
    return (
        <div>
            <h1>You are not logged in</h1>
            <p>Sorry, you need to log in to access this.</p>
            <Button component={Link} to="/login" variant="contained" color="primary">
                Login
            </Button>
            <Button component={Link} to="/" variant="contained" color="primary">
                Home
            </Button>
        </div>
    );
};

export default NotUser;
