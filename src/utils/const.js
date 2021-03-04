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
