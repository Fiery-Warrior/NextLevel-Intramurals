import React from 'react';
import './landingImage.css';
import './NLCI.css';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import Warning from './warning';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-text">
        <h1>Next Level</h1>
        <h2>Community</h2>
        <h2>Intramurals</h2>

        <p> Since 2023 </p>

        <Button variation="primary">Join Now</Button>

      </div>
      <div className="landing-page-image">
        <img src={process.env.PUBLIC_URL + '/static/images/baseball.png'} alt="" />
      </div>

      <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

      {/* <Warning/> */}

      
    </div>
  );
}

export default LandingPage;