export const findFilmById = (films, id) => {
  return films.find((element) => element.id === id);
};
