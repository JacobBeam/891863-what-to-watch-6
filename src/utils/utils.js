import {RatingLevels, allGenreFilter} from './const';

export const findFilmById = (films, id) => {
  return films.find((element) => element.id === id);
};


export const conversionMinutes = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};


export const findRatingLevel = (rating) => {

  let currentRating = ``;

  switch (true) {
    case (rating >= 0 && rating < 3):
      currentRating = RatingLevels.BAD;
      break;
    case (rating >= 3 && rating < 5):
      currentRating = RatingLevels.NORMAL;
      break;
    case (rating >= 5 && rating < 8):
      currentRating = RatingLevels.GOOD;
      break;
    case (rating >= 5 && rating < 10):
      currentRating = RatingLevels.VERY_GOOD;
      break;
    case (rating >= 10):
      currentRating = RatingLevels.AWESOME;
      break;
  }
  return currentRating;
};

export const filterFilmsByGenre = (genre, films) => {

  if (genre === allGenreFilter.ALL_GENRES) {
    return films;
  }

  return films.filter((film)=>film.genre === genre);
};
