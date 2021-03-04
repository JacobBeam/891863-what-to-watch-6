import {ActionCreator} from './action';
import {adaptToClient, AuthorizationStatus} from '../utils/const';

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
  .then((response) => response.data.map((film) =>adaptToClient(film)))
  .then((addaptedFilms)=> {
    dispatch(ActionCreator.loadFilms(addaptedFilms));
  })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})

);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then((response) => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, response.data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);
