import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    card: {
        width: '30%', // increase the width of the card
        minWidth: 310, // increase the MIN width of the card
        margin: '0 1%', //'2%' represents the space between each card
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            margin: '2%',
        },
    },
    media: {
        height: 0,
        paddingTop: '50%', // increase the height of the media
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    blurbackground: {
      filter: 'blur(5px)',
      transition: 'filter 0.095s ease',

    },
}));

const cards_row1 = [
  {
    title: 'Patriot Football',
    description: 'This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1',
    image: '/static/images/football.png',
    location: 'Football Field',
  },
  {
    title: 'Viking Soccer',
    description: 'This is the description for card 2',
    image: '/static/images/soccer.png',
    location: 'Soccer Field',
  },
  {
    title: 'Blues Hockey',
    description: 'This is the description for card 3',
    image: '/static/images/hockey.png',
    location: 'Hockey Rink',
  },  
  {
    title: 'Track & Field',
    description: 'This is the description for card 3',
    image: '/static/images/track.png',
    location: 'Track',
  },
];

export default function SportCardRow() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [cardLocation, setCardLocation] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [BackgroundBlur, setBackgroundBlur] = useState(false);

  const handleOpen = (title, location) => {
    setOpen(true);
    setCardTitle(title);
    setCardLocation(location);
    setBackgroundBlur(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBackgroundBlur(false);
  };

  const handleSchedule = () => {
    setOpen(false);
  }

  return (
    <div className={`${classes.root} ${BackgroundBlur ? classes.blurbackground : ''}`}>
      {cards_row1.map((card) => (
        <Card key={card.title} className={classes.card} onClick={() => handleOpen(card.title, card.location)}>
          
          <CardMedia
            className={classes.media}
            image={card.image}
            title={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {card.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
      
      <Modal //Modal Code
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            {cardTitle}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Location: {cardLocation}
          </Typography>
          Next Game:
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>

        </div>
      </Modal>
    </div>
  );
}