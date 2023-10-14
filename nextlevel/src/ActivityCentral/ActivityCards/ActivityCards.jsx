import * as React from 'react';
import './activitycards.css';
import FootballCard from './Football/FootballCard.jsx';
import Sporty from './Sporty/SportCardRow';


export default function ActivityCards() {
  return (
    <>
    <section className="activity-cards">
      <FootballCard/>
      <Sporty/>
    </section>



    </>
  
  );
}