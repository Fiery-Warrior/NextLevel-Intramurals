import * as React from 'react';
import './activitycards.css';
// import FootballCard from './Football/FootballCard.jsx';
// import Sporty from './Sporty/SportCardRow1';
import Row from './Sporty/Rows';


export default function ActivityCards() {
  return (
    <>
    <section className="activity-cards">
      <h1 className="activity-cards-title">Activity Central</h1>
      {/* <FootballCard/> */}
      {/* <Sporty/> */}
      <Row/>
    </section>

    </>
  
  );
}