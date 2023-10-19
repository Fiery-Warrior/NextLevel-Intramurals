// import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage/Landingpage';
import LoginPage from './pages/LoginPage/Loginpage';
import SigninPage from './pages/SigninPage/Signinpage';

import {BrowserRouter as Router, Routes, Route }
from 'react-router-dom';


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='signin' element={<SigninPage/>} />
        </Routes>
    </Router>
    
  );
}

export default App;
