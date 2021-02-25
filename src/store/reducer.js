import {ActionType} from './action';
import filmList from '../mocks/films';

const initialState = {
  genre: `All genres`,
  films: filmList
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
        ...initialState
      };
  }

  return state;
};

export {reducer};
