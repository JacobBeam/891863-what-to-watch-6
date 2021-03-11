export const ActionType = {
  GENRE_CHANGES: `filmData/changeGenre`,
  RESET_GENRES: `filmData/resetGenre`,
  LOAD_FILMS: `filmData/loadFilms`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `authorization/redirectToRoute`,
  SELECT_FILM: `filmData/selectFilm`,
  POST_COMMENT: `commentData/postComment`,
  ENABLE_COMMENT_FLAG: `commentData/enableCommentFlag`,
  LOAD_COMMENTS: `commentData/loadComments`,
  LOAD_PROMO: `filmData/loadPromo`,
  RESET_LOADED_STATUS: `filmData/resetLoadedStatus`,
  LOAD_FAVORITES_FILMS: `filmData/loadFavoritesFilms`
};

export const ActionCreator = {

  changeGenre: (genre) => ({
    type: ActionType.GENRE_CHANGES,
    payload: genre
  }),
  resetGenre: () => ({
    type: ActionType.RESET_GENRES,
  }),
  resetLoadedStatus: () => ({
    type: ActionType.RESET_LOADED_STATUS,
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
  }),
  selectFilm: (film)=>({
    type: ActionType.SELECT_FILM,
    payload: film
  }),
  postComment: (comment)=>({
    type: ActionType.POST_COMMENT,
    payload: comment
  }),
  enableCommentFlag: ()=>({
    type: ActionType.ENABLE_COMMENT_FLAG,
  }),
  loadComments: (comments)=>({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  loadPromo: (promo)=>({
    type: ActionType.LOAD_PROMO,
    payload: promo
  }),
  loadFavoritesFilms: (films)=>({
    type: ActionType.LOAD_FAVORITES_FILMS,
    payload: films
  }),
};
