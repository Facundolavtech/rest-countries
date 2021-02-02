/* eslint-disable import/no-anonymous-default-export */
const GET_COUNTRIES = "GET_COUNTRIES";
const GET_COUNTRIES_BY_REGION = "GET_COUNTRIES_BY_REGION";
const SEARCH_COUNTRY = "SEARCH_COUNTRY";

const initialState = {
  countries: [],
  countriesFilteredByRegion: [],
  countriesFilteredBySearch: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRIES_BY_REGION:
      return {
        ...state,
        countriesFilteredByRegion: state.countries.filter(
          (country) => country.region === action.payload
        ),
      };
    case SEARCH_COUNTRY:
      let list = [];
      if (state.countriesFilteredByRegion.length > 0) {
        list = state.countriesFilteredByRegion;
      } else {
        list = state.countries;
      }
      return {
        ...state,
        countriesFilteredBySearch: list.filter((country) =>
          country.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
}

export function getCountriesAction(countries) {
  return async (dispatch) => {
    dispatch(getCountriesFunction(countries));
  };
}

const getCountriesFunction = (countries) => ({
  type: GET_COUNTRIES,
  payload: countries,
});

export function getCountriesByRegionAction(region) {
  return async (dispatch) => {
    dispatch(getCountriesByRegionFunction(region));
  };
}

const getCountriesByRegionFunction = (region) => ({
  type: GET_COUNTRIES_BY_REGION,
  payload: region,
});

export function getCountriesBySearchAction(country) {
  return async (dispatch) => {
    dispatch(getCountriesBySearchFunction(country));
  };
}

const getCountriesBySearchFunction = (country) => ({
  type: SEARCH_COUNTRY,
  payload: country,
});
