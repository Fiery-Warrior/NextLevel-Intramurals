import React from 'react';
import Slider from 'react-slick';
import './landingImage.css';
import './imageslider.css';
import './NLCI.css';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';
import TopLanding from './TopLanding.jsx';
import TopNavBar from './NavBar/NavBar';
import ImageSlider from './ImageSlider';



const LandingPage = () => {

  return (
    <div className="start-page">
      <TopNavBar />
        <ImageSlider />

      <PrivacyNotification />

      <div className="activity-center">
        <ActivityCenter />
      </div>

      <Footer />
    </div>
  );
}


export default LandingPage;