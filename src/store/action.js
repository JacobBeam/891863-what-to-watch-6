export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  RESET_GENRES: `genre/reset`,
  LOAD_FILMS: `data/loadFilms`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `authorization/redirectToRoute`
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
  }),
  requireAuthorization: (status, user = {}) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: {status, user}
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
