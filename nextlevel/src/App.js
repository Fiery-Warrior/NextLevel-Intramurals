import './App.css';
import LandingPage from './Pages/LandingPage/Landingpage';
import LoginPage from './Pages/LogininPage/loginpage';
import AdminLoginPage from './Pages/AdminLogininPage/Adminloginpage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import UserProfile from './Pages/UserProfile/UserProfile';
import AdminDash from './Pages/Admin_Dash/AdminDash.jsx';
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

      <Router>
            <Routes>
              <Route exact path='/' element={<LandingPage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/adminlogin' element={<AdminLoginPage/>} />
              <Route path='/signin' element={<RegisterPage/>} />
              <Route path='/profile' element={<UserProfile/>} />
              <Route path='/admindash' element={<AdminDash/>} />
            </Routes>
        </Router>
  </div>

  </CookiesProvider>
    
  );
}

export default App;
