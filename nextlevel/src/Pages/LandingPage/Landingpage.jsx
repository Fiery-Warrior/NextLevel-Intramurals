import React from 'react';
import './landingImage.css';
import './NLCI.css';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';
import TopLanding from './TopLanding.jsx';
import TopNavBar from './NavBar/NavBar';




function LandingPage() {
  return (
    <div className="start-page">
      
      <TopNavBar/>
      <TopLanding/>

      <PrivacyNotification/>


      <div className="activity-center">
        <ActivityCenter />

      </div>
      
      <Footer/>

      
    </div>
  );
}

export default LandingPage;