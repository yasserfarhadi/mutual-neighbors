import { useState } from 'react';

import Cta from './components/Cta';
import MapChart from './components/MapChart';
import Sidebar from './components/Sidebar';
import MenuIcon from './components/MenuIcon';

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [mutual, setMutual] = useState([]);
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const menuHandler = () => {
    setMenuOpen((prev) => !prev);
  };
  const countriesHandler = async () => {
    const url = 'https://travelbriefing.org/countries.json';

    const tenRandomCountries = [];
    const finalTen = [];

    const fetchCountries = await fetch(url);
    const countriesJsonData = await fetchCountries.json();

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * countriesJsonData.length);
      const currentRandomCountry = { ...countriesJsonData[randomNumber] };
      tenRandomCountries.push({ ...currentRandomCountry });
    }

    const allFeches = tenRandomCountries.map((country) => fetch(country.url));

    const allResponses = await Promise.all(allFeches);

    for (let j = 0; j < allResponses.length; j++) {
      const jsonData = await allResponses[j].json();
      const currentCountryResponse = {
        name: jsonData.names.name,
        location: { lat: jsonData.maps.lat, lng: jsonData.maps.long },
        neighbors: jsonData.neighbors.map((item) => ({ ...item })),
      };
      finalTen.push(currentCountryResponse);
    }
    setCountries(finalTen);
  };

  const mutualHandler = () => {
    const mutualNeighbors = [];
    const filteredCounties = [];
    for (let i = 0; i < countries.length; i++) {
      for (let j = i + 1; j < countries.length; j++) {
        for (let k = 0; k < countries[j].neighbors.length; k++) {
          if (
            countries[i].name.toLowerCase() ===
            countries[j].neighbors[k].name.toLowerCase()
          ) {
            const currentMutualNeighbors = {
              from: countries[i],
              to: countries[j],
            };
            filteredCounties.push(countries[i], countries[j]);
            mutualNeighbors.push(currentMutualNeighbors);
          }
        }
      }
    }
    if (mutualNeighbors.length > 0) {
      setCountries(filteredCounties);
      setMutual(mutualNeighbors);
      setMessage(`${mutualNeighbors.length} match(es) found`);
    } else {
      setMessage('No mutual neighbors found!');
    }
  };

  const resetHandler = () => {
    setCountries([]);
    setMutual([]);
    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <MenuIcon isOpen={menuOpen} menuHandler={menuHandler} />
        <Sidebar isOpen={menuOpen}>
          <Cta
            message={message}
            countries={countries.length > 0 ? true : false}
            mutual={mutual.length > 0 ? true : false}
            countriesHandler={countriesHandler}
            mutualHandler={mutualHandler}
            resetHandler={resetHandler}
          />
        </Sidebar>
        <div className="map">
          <MapChart countries={countries} mutual={mutual} />
        </div>
      </header>
    </div>
  );
}

export default App;
