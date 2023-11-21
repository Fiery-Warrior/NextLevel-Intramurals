import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotAdmin = () => {
    return (
        <div>
            <h2>This page does not exist</h2>
            <p>Sorry, you are not logged in or the page you're looking for does not exist.</p>
            <Button component={Link} to="/login" variant="contained" color="primary" className="button" style={{margin: '10px'}}>
                Login
            </Button>
            <Button component={Link} to="/adminlogin" variant="contained" color="primary" className="button" style={{margin: '10px'}}>
                Login
            </Button>
            <Button component={Link} to="/" variant="contained" color="primary" className="button" style={{margin: '10px'}}>
                Home
            </Button>
        </div>
    );
};

export default NotAdmin;