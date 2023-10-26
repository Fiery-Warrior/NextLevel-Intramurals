// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import Grid from '@material-ui/core/Grid';
// import Container from '@mui/material/Container';
// import CardDesign from './CardDesign';

// import { useCookies } from 'react-cookie';

// const useStyles = makeStyles((theme) => ({
//         root: {
//                 flexGrow: 1,
//                 padding: theme.spacing(2),
//                 minHeight: '100vh',
//         },
//         card: {
//                 width: '30%',
//                 minWidth: 310,
//                 margin: '0 0.575%',
//                 [theme.breakpoints.down('sm')]: {
//                         width: '80%',
//                         margin: '2%',
//                 },
//         },
//         media: {
//                 height: 0,
//                 paddingTop: '50%',
//         },
//         modal: {
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//         },
//         paper: {
//                 backgroundColor: theme.palette.background.paper,
//                 border: '2px solid #000',
//                 boxShadow: theme.shadows[5],
//                 padding: theme.spacing(2, 4, 3),
//         },
//         cardContent: {
//                 height: '150px',
//         },
//         container: {
//                 backgroundColor: '#F5F5F5',
//                 boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
//                 padding: theme.spacing(2),
//                 margin: 'auto',
//                 marginTop: theme.spacing(4),
//                 width: '100%',
//         },
// }));

// const cards_row1 = [
//     {
//         title: 'Patriot Football',
//         description: 'This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1',
//         image: '/static/images/football.png',
//         location: 'Football Field',
//     },
//     {
//         title: 'Viking Soccer',
//         description: 'This is the description for card 2',
//         image: '/static/images/soccer.png',
//         location: 'Soccer Field',
//     },
//     {
//         title: 'Blues Hockey',
//         description: 'This is the description for card 3',
//         image: '/static/images/hockey.png',
//         location: 'Hockey Rink',
//     },  
//     {
//         title: 'Track & Field',
//         description: 'This is the description for card 3',
//         image: '/static/images/track.png',
//         location: 'Track',
//     },
// ];

// function SportCardRow() {
//     const classes = useStyles();
//     const [open, setOpen] = useState(false);
//     const [cardTitle, setCardTitle] = useState('');
//     const [cardLocation, setCardLocation] = useState('');

//     const handleOpen = (title, location) => {
//         setOpen(true);
//         setCardTitle(title);
//         setCardLocation(location);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <Grid container spacing={2}>
//             {cards_row1.map((card) => (
//                 <Grid item xs={12} sm={6} md={3} key={card.title}>
//                     <Card className={classes.card} onClick={() => handleOpen(card.title, card.location)}>
//                         <CardMedia
//                             className={classes.media}
//                             image={card.image}
//                             title={card.title}
//                         />
//                         <CardContent className={classes.cardContent}>
//                             <Typography gutterBottom variant="h5" component="h2">
//                                 {card.title}
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary" component="p">
//                                 {card.description}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             ))}
//             <Modal
//                 className={classes.modal}
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                 <div className={classes.paper}>
//                     <Typography variant="h6" id="modal-title">
//                         {cardTitle}
//                     </Typography>
//                     <Typography variant="subtitle1" id="simple-modal-description">
//                         Location: {cardLocation}
//                     </Typography>
//                 </div>
//             </Modal>
//         </Grid>
//     );
// }

// function UserProfile() {
//         const [cookies] = useCookies(['myCookie']);
//         const [email, setEmail] = useState('');
//         const classes = useStyles();
//         console.log('Cookie is: ', cookies);
//         console.log('email is: ', email);
//         useEffect(() => {
//                 if (cookies.myCookie && !email) {
//                         setEmail(cookies.myCookie.email);
//                 }
//         }, [cookies, email]);

//         return (
//                 <div className={classes.root}>
//                     <h1>User Profile</h1>
//                     <p>Welcome to your profile, {email}!</p>
//                     <CardDesign/>
//                                 <SportCardRow />
//                 </div>
//         );
// }

// export default UserProfile;

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

