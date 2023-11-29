import React from 'react';
import './landingImage.css';
import './NLCI.css';
// import { Button } from '@aws-amplify/ui-react';
import {Button } from '@material-ui/core';

import '@aws-amplify/ui-react/styles.css';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';

import CarouselFadeExample from './Imagecarousel.jsx';


function TopLanding() {
  return (
    <div className="landing-page">
      <div className="landing-page-text">
        <h1>Next Level</h1>
        <h2>Community</h2>
        <h2>Intramurals</h2>

        <p> Since 2023 </p>

        <Button variation="primary"  href='/register' style ={{backgroundColor: 'rgb(4, 125, 149)', color: 'white'}}>Join Now</Button >


      </div>
      <div className="landing-page-image">
        <img src={process.env.PUBLIC_URL + '/static/images/baseball.png'} alt="" />
        {/* <CarouselFadeExample /> */}
      </div>

      <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

      
    </div>
  );
}

export default TopLanding;