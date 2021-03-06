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

export const fetchFilmById = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
  .then((response) => adaptToClient(response.data))
  .then((addaptedFilm)=> {
    dispatch(ActionCreator.selectFilm(addaptedFilm));
  })
  .catch()
);

export const fetchFilmComments = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
  .then((response)=> {
    dispatch(ActionCreator.loadComments(response.data));
  })
  .catch()
);

export const postComment = ({rating, comment}, id) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {rating, comment})
    .then((response) => {
      dispatch(ActionCreator.postComment(response.data));
      return response;
    })
    .then((response) => dispatch(ActionCreator.loadComments(response.data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/films/${id}`)))
    .catch()
);
