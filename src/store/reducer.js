import {ActionType} from './action';
import {allGenreFilter, AuthorizationStatus} from '../utils/const';

const initialState = {
  genre: allGenreFilter.ALL_GENRES,
  films: [],
  isFilmsLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isFilmsLoaded: true
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload.status,
        user: action.payload.user
      };
  }

  return state;
};

export {reducer};
