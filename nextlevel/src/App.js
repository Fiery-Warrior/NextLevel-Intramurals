// import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/Landingpage';
import ActivityCenter from './ActivityCentral/ActivityCenter';

import Test  from './ActivityCentral/ActivityCards/Sporty/Test';

function App() {
  return (
    <div className="App">
      <Test/>
      <header className="App-header">

      <LandingPage/>
      <section className='activity-center'/>
      <ActivityCenter/>


      </header>
    </div>
  );
}

export default App;
