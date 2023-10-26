import './App.css';
import NavBar from './Pages/LandingPage/NavBar/NavBar';
import Footer from './Pages/LandingPage/NavBar/Footer';
// import PrivacyNotification from './NavBar/PrivacyNotification';
// import ActivityCenter from './ActivityCentral/ActivityCenter';
import LandingPage from './Pages/LandingPage/Landingpage';
import LoginPage from './Pages/LogininPage/loginpage';
import WelcomePage from './Pages/WelcomePage/WelcomePage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { CookiesProvider, useCookies } from "react-cookie";
import {BrowserRouter as Router, Routes, Route }
from 'react-router-dom';


function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <CookiesProvider>

    <div className="App">
    {/* <NavBar/> */}
   {/* <PrivacyNotification/> */}
   {/* {cookies.user ? (
          <WelcomePage user={cookies.user} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )} */}

      <Router>
            <Routes>
              <Route exact path='/' element={<LandingPage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/signin' element={<RegisterPage/>} />
              <Route path='/profile' element={<UserProfile/>} />
            </Routes>
        </Router>
  </div>

  </CookiesProvider>
    
  );
}

export default App;
