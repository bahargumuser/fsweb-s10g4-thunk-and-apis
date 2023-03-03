import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

export const fetchAnother = () => (dispatch) => {
  dispatch({ type: FETCH_LOADING, payload: true });

  axios
    .get("http://universities.hipolabs.com/search?country=United+States", {
      params: {
        country: "Switzerland",
      },
    })
    .then(function (response) {
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
      dispatch({ type: FETCH_LOADING, payload: false });
      dispatch({ type: FETCH_ERROR, payload: null });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: [error.code, error.message] });
      dispatch({ type: FETCH_LOADING, payload: false });
    });
};
