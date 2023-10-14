// import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar/NavBar';
import Footer from './NavBar/Footer';
import LandingPage from './LandingPage/Landingpage';
import ActivityCenter from './ActivityCentral/ActivityCenter';


function App() {
  return (
    <div className="App">
      <NavBar/>

      <header className="App-header">

      <LandingPage/>
      <section className='activity-center'/>
      <ActivityCenter/>


      </header>
      <Footer/>

    </div>
  );
}

export default App;
