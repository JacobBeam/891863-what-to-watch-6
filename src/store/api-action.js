import {ActionCreator} from './action';
import {adaptToClient, AuthorizationStatus, APIRoute, AppRoute} from '../utils/const';

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
  .then((response) => response.data.map((film) =>adaptToClient(film)))
  .then((addaptedFilms)=> {
    dispatch(ActionCreator.loadFilms(addaptedFilms));
  })
  .catch(() => {})
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
  .then((response) => adaptToClient(response.data))
  .then((addaptedFilm)=> {
    dispatch(ActionCreator.loadPromo(addaptedFilm));
  })
  .catch()
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})

);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then((response) => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, response.data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
);

export const fetchFilmById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
  .then((response) => adaptToClient(response.data))
  .then((addaptedFilm)=> {
    dispatch(ActionCreator.selectFilm(addaptedFilm));
  })
  .catch()
);

export const fetchFilmComments = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${id}`)
  .then((response)=> {
    dispatch(ActionCreator.loadComments(response.data));
  })
  .catch()
);

export const postComment = ({rating, comment}, id) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${id}`, {rating, comment})
    .then((response) => {
      dispatch(ActionCreator.postComment(response.data));
      return response;
    })
    .then((response) => dispatch(ActionCreator.loadComments(response.data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`${APIRoute.FILMS}/${id}`)))
    .catch()
);

export const postFavoriteStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${Number(!status)}`)
  .then((response) => adaptToClient(response.data))
  .then((addaptedFilm)=> {
    dispatch(ActionCreator.selectFilm(addaptedFilm));
  })
  .catch()
);

export const postFavoriteStatusPromo = (id, activeStatus) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${Number(!activeStatus)}`)
  .then((response) => adaptToClient(response.data))
  .then((addaptedFilm)=> {
    dispatch(ActionCreator.loadPromo(addaptedFilm));
  })
  .catch()
);

export const fetchFavoritesFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
  .then((response) => response.data.map((film) =>adaptToClient(film)))
  .then((addaptedFilms)=> {
    dispatch(ActionCreator.loadFavoritesFilms(addaptedFilms));
  })
  .catch(() => {})
);
