import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Row from '../LandingPage/ActivityCentral/ActivityCards/Sporty/Rows'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TopNavBar from '../LandingPage/NavBar/NavBar';
import Footer from '../LandingPage/NavBar/Footer';

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
        <Stack direction="row" spacing={1}>
            {/* <TopNavBar/> */}
                {/* <Box sx={{ position: 'fixed', top: 15 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/baseball.png" />
                </Box> */}
                <Row/>
        </Stack>
                <Footer/>
                </>
    );
}