export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  RESET_GENRES: `genre/reset`,
  LOAD_FILMS: `data/loadFilms`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `authorization/redirectToRoute`,
  SELECT_FILM: `data/selectFilm`,
  POST_COMMENT: `data/postComment`,
  ENABLE_COMMENT_FLAG: `data/enableCommentFlag`,
  LOAD_COMMENTS: `data/loadComments`

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
};
