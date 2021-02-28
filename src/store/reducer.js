import {ActionType} from './action';
import {allGenreFilter} from '../utils/const';

const initialState = {
  genre: allGenreFilter.ALL_GENRES,
  films: [],
  isFilmsLoaded: false
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
  }

  return state;
};

export {reducer};
