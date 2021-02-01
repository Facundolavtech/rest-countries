/* eslint-disable import/no-anonymous-default-export */
const GET_COUNTRIES = "GET_COUNTRIES";
const GET_COUNTRIES_BY_REGION = "GET_COUNTRIES_BY_REGION";

const initialState = {
  countries: null,
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
        countries: countries.filter(
          (country) => country.region === action.payload
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
