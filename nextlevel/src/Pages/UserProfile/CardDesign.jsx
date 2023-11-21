import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Row from '../LandingPage/ActivityCentral/ActivityCards/Sporty/Rows'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TopNavBar from '../LandingPage/NavBar/NavBar';
import Footer from '../LandingPage/NavBar/Footer';
import './carddesign.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



export default function SquareCorners() {
    return (
        <>
        {/* <div className='not-logged-in'>
            <h1>You are not logged in</h1>
                <p>Sorry, you need to log in to access this.</p>
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Login
                </Button>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Home
                </Button>
        </div> */}

        {/* <Stack direction="row" spacing={1}> */}
            {/* <TopNavBar/> */}
                {/* <Box sx={{ position: 'fixed', top: 15 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/baseball.png" />
                </Box> */}


                {/* <Row/> */}
        {/* </Stack> */}
                <Footer/>
                </>
    );
}