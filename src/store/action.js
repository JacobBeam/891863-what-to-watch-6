export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  RESET_GENRES: `genre/reset`,
  LOAD_FILMS: `data/loadFilms`
};

export const ActionCreator = {

  changeGenre: (genre) => ({
    type: ActionType.GENRE_CHANGES,
    payload: genre
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRES,
  }),
  loadFilms: (films)=>({
    type: ActionType.LOAD_FILMS,
    payload: films
  })
};
