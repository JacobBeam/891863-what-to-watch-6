import {RatingLevels, DateFormat} from './const';

export const findFilmById = (films, id) => {
  return films.find((element) => element.id === id);
};


export const conversionMinutes = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}${DateFormat.HOURS_SHORT} ${minutes}${DateFormat.MINUTS_SHORT}`;
};

export const convertSecondsForVideo = (sec) => {
  const hours = Math.floor(sec / 60 / 60);
  const minutes = Math.floor(sec / 60) - (hours * 60);
  const seconds = Math.floor(sec % 60);
  return `${hours}:${minutes}:${seconds}`;
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
