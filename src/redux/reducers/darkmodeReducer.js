/* eslint-disable import/no-anonymous-default-export */
const SET_DARKMODE = "SET_DARKMODE";

const initialState = {
  darkmode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DARKMODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };

    default:
      return state;
  }
}

export function setDarkModeAction() {
  return async (dispatch) => {
    dispatch(setDarkModeFunction());
  };
}

const setDarkModeFunction = () => ({
  type: SET_DARKMODE,
});
