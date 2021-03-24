export const TabType = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

export const RatingLevels = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`
};

export const allGenreFilter = {
  ALL_GENRES: `All genres`
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const START_COUNT_FILMS_IN_LIST = 8;

export const adaptToClient = (film) => {

  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterImage: film.poster_image,
        previewImage: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link,
        runTime: film.run_time,
        isFavorite: film.is_favorite,
        scoresCount: film.scores_count
      }
  );


  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;
  delete adaptedFilm.is_favorite;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;

  return adaptedFilm;
};

export const amountOfStars = 10;

export const AppRoute = {
  ROOT: `/`,
  MY_LIST: `/mylist`,
  PLAYER: `/player`,
  PLAYER_WITH_PARAMETR: `/player/:id`,
  FILM_WITH_PARAMETR: `/films/:id`,
  LOGIN: `/login`,
  REVIEW_WITH_PARAMETR: `/films/:id/review`,
  FILMS: `/films`,
  LOGOUT: `/logout`,
  REVIEW: `/review`
};

export const APIRoute = {
  FILMS: `/films`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments`,
  FAVORITE: `/favorite`
};

export const DateFormat = {
  ENGLISH: `en-Us`,
  LONG: `long`,
  NUMERIC: `numeric`,
  HOURS_SHORT: `h`,
  MINUTS_SHORT: `m`
};
