export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  RESET_GENRES: `genre/reset`,
  FILM_BY_GENRE: `film/filteringByGenre`
};

export const ActionCreator = {

  changeGenre: (genre) => ({
    type: ActionType.GENRE_CHANGES,
    payload: genre
  }),
  resetGenre: () =>({
    type: ActionType.RESET_GENRES,
  })
};
