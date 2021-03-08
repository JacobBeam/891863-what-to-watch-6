import {NameSpace} from '../root-reducer';
import {createSelector} from "reselect";
import {allGenreFilter} from '../../utils/const';

export const getFilms = (state) => state[NameSpace.FILM_DATA].films;
export const getFilmsLoadedStatus = (state) => state[NameSpace.FILM_DATA].isFilmsLoaded;
export const getSelectedMovie = (state) => state[NameSpace.FILM_DATA].selectedMovie;
export const getSelectedFilmLoadedStatus = (state) => state[NameSpace.FILM_DATA].isSelectedFilmLoaded;
export const getGenre = (state) => state[NameSpace.FILM_DATA].genre;
export const getPromo = (state) => state[NameSpace.FILM_DATA].promo;

export const getfilterFilmsByGenre = createSelector(
    [getGenre, getFilms],
    (genre, films) => {
      if (genre === allGenreFilter.ALL_GENRES) {
        return films;
      }
      return films.filter((film)=>film.genre === genre);
    }
);
