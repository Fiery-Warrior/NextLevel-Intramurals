import './App.css';
import LandingPage from './Pages/LandingPage/Landingpage';
import LoginPage from './Pages/LogininPage/loginpage';
import AdminLoginPage from './Pages/AdminLogininPage/Adminloginpage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import UserProfile from './Pages/UserProfile/UserProfile';
import Admindash2 from './Pages/Admin_Dash/admindash2.jsx';
import AdminDash from './Pages/Admin_Dash/AdminDash.jsx';
import TeamSelectionPage from './Pages/TeamSelectionPage/TeamSelection';
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx';
import { CookiesProvider, useCookies } from "react-cookie";
import {BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import sha256 from 'js-sha256';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Cookie will expire after 7 days / give the user a Sabbath day :)

    // Hash the user's email before storing it in the cookie
    const hashedEmail = sha256(user.email);
    
    // Replace the email with the hashed version
    const userWithHashedEmail = { ...user, email: hashedEmail };

    setCookie("user", userWithHashedEmail, { path: "/", expires: date });
  }


  return (
    <CookiesProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={<LandingPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/adminlogin' element={<AdminLoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/profile' element={<UserProfile/>} />
            <Route path='/admindash' element={<AdminDash/>} />
            <Route path='/teamselection' element={<TeamSelectionPage/>} />
            <Route path='/reset' element={<ResetPassword/>} />
            <Route path='/admindash2' element={<Admindash2/>} />
          </Routes>
        </Router>
      </div>
    </CookiesProvider>
  );
}

export default App;