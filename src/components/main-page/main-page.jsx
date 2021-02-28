import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import GenreList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {Link} from 'react-router-dom';
import {filmsPropTypes} from '../../utils/prop-types';
import {filterFilmsByGenre} from '../../utils/utils';
import {START_COUNT_FILMS_IN_LIST, AuthorizationStatus} from '../../utils/const';

// Выход из личного кабинета, для тестов. Висит на логотипе в футере
import {logout} from "../../store/api-action";

const MainPage = (props)=> {

  const [countFilmsInFilter, setCountFilmsInFilter] = useState(START_COUNT_FILMS_IN_LIST);
  const {films, genre, authorizationStatus, onFollowingToMyList, onFollowingToPlayer, onLogout} = props;

  const filteredFilms = filterFilmsByGenre(genre, films);

  const handleLogout = (evt) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={films[0].backgroundImage} alt={films[0].name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="user-block">

            {(authorizationStatus === AuthorizationStatus.AUTH) ?
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                  style={{cursor: `pointer`}}
                  onClick={()=> onFollowingToMyList()}
                />
              </div> : <Link to="/login" className="user-block__link">Sign in</Link>
            }
          </div>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={films[0].posterImage} alt={films[0].name} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{films[0].name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{films[0].genre}</span>
                <span className="movie-card__year">{films[0].released}</span>
              </p>
              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => onFollowingToPlayer()}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList
            setStartCountFilmsInList={setCountFilmsInFilter}>
          </GenreList>
          <MovieList
            films={filteredFilms}
            countFilmsInList={countFilmsInFilter}
          ></MovieList>

          { filteredFilms.length > countFilmsInFilter &&
            <ShowMoreButton
              countFilmsInList={countFilmsInFilter}
              setCountFilmsInList={setCountFilmsInFilter}
            ></ShowMoreButton>
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a
              href="#"
              className="logo__link logo__link--light"
              onClick={handleLogout}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

MainPage.propTypes = {
  ...filmsPropTypes,
  genre: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  films: state.films,
  authorizationStatus: state.authorizationStatus,
  onFollowingToMyList: PropTypes.func.isRequired,
  onFollowingToPlayer: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
