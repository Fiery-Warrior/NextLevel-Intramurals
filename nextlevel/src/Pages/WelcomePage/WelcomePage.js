import React from 'react';

function WelcomePage({ user }) {
  return <h1>Welcome, {user.username}!</h1>;
}

export default WelcomePage;
