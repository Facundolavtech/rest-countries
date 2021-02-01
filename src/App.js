import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Country from "./components/Country";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getCountriesAction } from "./redux/reducers/countriesReducer";

function App() {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCountriesFunction = async () => {
      const getCountries = await axios.get(
        `https://restcountries.eu/rest/v2/all`
      );

      const countryList = getCountries.data;

      dispatch(getCountriesAction(countryList));
    };
    getCountriesFunction();
  }, []);

  const changeRegion = (e) => {};

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <div className="darkmode__switch">
          <button>Dark Mode</button>
        </div>
      </header>
      <input
        type="text"
        placeholder="Search for a country..."
        className="search__country"
      />
      <select onChange={(e) => changeRegion(e.target.value)}>
        <option value="all">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <div className="countries__container">
        {countries !== null ? (
          <>
            {countries.map((country) => {
              return (
                <Country
                  img={country.flag}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              );
            })}
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default App;
