import React, {useEffect, useContext} from 'react'
import GlobalContext from './Components/Context/GlobalContext';
import './App.css';
// Components
import Header from './Components/header/Header';
import UserForm from './Components/userData/userform/userform';
// API
import { Dropdown, Country, AllStates} from './Components/Api/Dropdown/dropdown';

function App() {
    const{states, country, countryCode} = useContext(GlobalContext);
    Dropdown();
    Country();
    AllStates();

    // console.log(states);

  return (
    <div className="App">
      <Header/>
      <UserForm/>
    </div>
  );
}

export default App;
