import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Country from "./components/Country";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getCountriesAction,
  getCountriesByRegionAction,
  getCountriesBySearchAction,
} from "./redux/reducers/countriesReducer";
import { setDarkModeAction } from "./redux/reducers/darkmodeReducer";
import styled from "styled-components";

const DarkModeSwitcher = styled.div`
  button {
    width: auto;
    height: auto;
    img {
      width: 45px;
      display: flex;
    }
  }
`;

function App() {
  const [countrySearch, setCountrySearch] = useState("");
  const countries = useSelector((state) => state.countries.countries);
  const countriesFilteredByRegion = useSelector(
    (state) => state.countries.countriesFilteredByRegion
  );
  const countriesFilteredBySearch = useSelector(
    (state) => state.countries.countriesFilteredBySearch
  );
  const darkMode = useSelector((state) => state.darkmode.darkmode);
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

  const changeRegion = (e) => {
    dispatch(getCountriesByRegionAction(e));
    if (countrySearch !== null) {
      dispatch(getCountriesBySearchAction(countrySearch));
    }
  };

  const searchCountry = (e) => {
    setCountrySearch(e.target.value);

    if (countrySearch !== null) {
      dispatch(getCountriesBySearchAction(e.target.value));
    }
  };

  const deleteSearch = () => {
    setCountrySearch("");
    dispatch(getCountriesBySearchAction(""));
  };

  const switchDarkMode = () => {
    dispatch(setDarkModeAction());
  };

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <DarkModeSwitcher className="darkmode__switch">
          <button onClick={() => switchDarkMode()}>
            <img
              src={darkMode ? "assets/img/luna.png" : "assets/img/sol.png"}
            />
          </button>
        </DarkModeSwitcher>
      </header>
      <div className="search__container">
        <input
          value={countrySearch}
          type="text"
          placeholder="Search for a country..."
          className="search__country"
          onChange={searchCountry}
        />
        {countrySearch.trim() !== "" && (
          <button className="delete__search" onClick={() => deleteSearch()}>
            X
          </button>
        )}
      </div>
      <select onChange={(e) => changeRegion(e.target.value)}>
        <option value="all">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {countriesFilteredBySearch.length > 0 ? (
        <div className="countries__container">
          {countriesFilteredBySearch.map((country) => (
            <>
              <Country
                img={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />{" "}
            </>
          ))}
        </div>
      ) : (
        <div className="countries__container">
          {countries !== null ? (
            <>
              {countriesFilteredByRegion.length === 0
                ? countries.map((country) => (
                    <>
                      <Country
                        img={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />{" "}
                    </>
                  ))
                : countriesFilteredByRegion.map((country) => (
                    <>
                      <Country
                        img={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />{" "}
                    </>
                  ))}
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
