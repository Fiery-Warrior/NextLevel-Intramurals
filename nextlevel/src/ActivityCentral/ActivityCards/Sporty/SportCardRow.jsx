import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        minWidth: 350, // increase the MIN width of the card
        margin: '0 3%', //'2%' represents the space between each card
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            margin: '2%',
        },
    },
    media: {
        height: 0,
        paddingTop: '50%', // increase the height of the media
    },
}));

const cards = [
  {
    title: 'Football',
    description: 'This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1This is the description for card 1',
    image: '/static/images/football.png',
  },
  {
    title: 'Card 2',
    description: 'This is the description for card 2',
    image: 'https://picsum.photos/300/200',
  },
  {
    title: 'Card 3',
    description: 'This is the description for card 3',
    image: 'https://picsum.photos/300/200',
  },
];

export default function SportCardRow() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {cards.map((card) => (
        <Card key={card.title} className={classes.card}>
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
    </div>
  );
}