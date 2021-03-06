import {ActionType} from './action';
import {allGenreFilter, AuthorizationStatus} from '../utils/const';

const initialState = {
  genre: allGenreFilter.ALL_GENRES,
  films: [],
  isFilmsLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
  selectedMovie: {},
  isSelectedFilmLoaded: false,
  isSentComment: false,
  selectedComments: []
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
    case ActionType.SELECT_FILM:
      return {
        ...state,
        selectedMovie: action.payload,
        isSelectedFilmLoaded: true
      };
    case ActionType.POST_COMMENT:
      return {
        ...state,
        isSentComment: false
      };
    case ActionType.ENABLE_COMMENT_FLAG:
      return {
        ...state,
        isSentComment: true
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        selectedComments: action.payload,
      };
  }

  return state;
};

export {reducer};
