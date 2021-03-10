import {ActionType} from '../action';
import {allGenreFilter} from '../../utils/const';

const initialState = {
  films: [],
  isFilmsLoaded: false,
  selectedMovie: {},
  isSelectedFilmLoaded: false,
  genre: allGenreFilter.ALL_GENRES,
  promo: {},
  isPromoLoaded: false,
  favoritesFilms: [],
  isFavoritesFilmsLoaded: false,
};

const filmData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isFilmsLoaded: true
      };
    case ActionType.SELECT_FILM:
      return {
        ...state,
        selectedMovie: action.payload,
        isSelectedFilmLoaded: true
      };
    case ActionType.GENRE_CHANGES:
      return {
        ...state,
        genre: action.payload
      };
    case ActionType.RESET_GENRES:
      return {
        ...state,
        genre: allGenreFilter.ALL_GENRES,
      };
    case ActionType.RESET_LOADED_STATUS:
      return {
        ...state,
        isSelectedFilmLoaded: false,
        isPromoLoaded: false,
        isFavoritesFilmsLoaded: false
      };
    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promo: action.payload,
        isPromoLoaded: true
      };
    case ActionType.LOAD_FAVORITES_FILMS:
      return {
        ...state,
        favoritesFilms: action.payload,
        isFavoritesFilmsLoaded: true
      };
  }

  return state;
};

export {filmData};
