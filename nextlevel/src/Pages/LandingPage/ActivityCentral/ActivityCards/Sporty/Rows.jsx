import * as React from 'react';
import SportCardRow2 from './SportCardRow2';
import SportCardRow1 from './SportCardRow1';

export default function Row() {
  return (
    <>
    <section className="activity-cards">
      <SportCardRow1/>
      <section style={{padding: '1%'}}></section>
      <SportCardRow2/>
      </section>
    </>
  );
}