import React from 'react';
import './landingImage.css';
import './NLCI.css';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-text">
        <h1>Next Level</h1>
        <h2>Community</h2>
        <h2>Intramurals</h2>

        <p> Since I don't remember when </p>

        <Button variation="primary">Join Now</Button>
        <Button style={{ marginTop: '10px' }}>Login</Button>

      </div>
      <div className="landing-page-image">
        <img src={process.env.PUBLIC_URL + '/trophy.png'} alt="Trophy" />
      </div>
    </div>
  );
}

export default LandingPage;