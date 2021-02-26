import {ActionCreator} from './action';
import {adaptToClient} from '../utils/const';

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
  .then((response) => response.data.map((film) =>adaptToClient(film)))
  .then((addaptedFilms)=> {
    dispatch(ActionCreator.loadFilms(addaptedFilms));
  })
);
