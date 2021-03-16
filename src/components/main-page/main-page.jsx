import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MovieList from '../movie-list/movie-list';
import GenreList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {Link} from 'react-router-dom';
import {filmsPropTypes} from '../../utils/prop-types';
import {START_COUNT_FILMS_IN_LIST, AuthorizationStatus} from '../../utils/const';
import {getfilterFilmsByGenre, getPromo, getLoadedPromoStatus, getFilmsLoadedStatus} from '../../store/film-data/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {postFavoriteStatusPromo, fetchPromoFilm, fetchFilmsList} from '../../store/api-action';
import LoadingPage from '../loading-page/loading-page';
import {ActionCreator} from '../../store/action';

// Выход из личного кабинета, для тестов. Висит на логотипе в футере
import {logout} from "../../store/api-action";

const MainPage = (props)=> {

  const [countFilmsInFilter, setCountFilmsInFilter] = useState(START_COUNT_FILMS_IN_LIST);
  const {
    filteredFilms,
    promo,
    authorizationStatus,
    onFollowingToMyList,
    onFollowingToPlayer,
    onLogout,
    onChangeFavoriteStatus,
    onLoadPromo,
    onResetLoadedStatus,
    isPromoLoaded,
    isFilmsLoaded,
    onLoadData
  } = props;


  useEffect(() => {
    if (!isFilmsLoaded) {
      onLoadData();
    }
  }, [isFilmsLoaded]);

  useEffect(() => {
    onResetLoadedStatus();
  }, []);


  useEffect(() => {
    if (!isPromoLoaded) {
      onLoadPromo();
    }
  }, [isPromoLoaded]);



  if (!isPromoLoaded || !isFilmsLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }




  const handleLogout = (evt) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promo.backgroundImage} alt={promo.name} />
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
              <img src={promo.posterImage} alt={promo.name} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promo.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promo.genre}</span>
                <span className="movie-card__year">{promo.released}</span>
              </p>
              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => onFollowingToPlayer(promo)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                {(authorizationStatus === AuthorizationStatus.AUTH) ?
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={()=>onChangeFavoriteStatus(promo.id, promo.isFavorite)}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={(promo.isFavorite) ? `#del` : `#add`}></use>
                    </svg>
                    <span>My list</span>
                  </button> : ``}
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
  onFollowingToMyList: PropTypes.func.isRequired,
  onFollowingToPlayer: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  filteredFilms: filmsPropTypes.films,
  authorizationStatus: PropTypes.string.isRequired,
  promo: PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number,
    genre: PropTypes.string,
    released: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoLink: PropTypes.string,
    previewVideoLink: PropTypes.string,
  }),
  onChangeFavoriteStatus: PropTypes.func.isRequired,
  onLoadPromo: PropTypes.func.isRequired,
  onResetLoadedStatus: PropTypes.func.isRequired,
  isPromoLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  promo: getPromo(state),
  authorizationStatus: getAuthorizationStatus(state),
  filteredFilms: getfilterFilmsByGenre(state),
  isPromoLoaded: getLoadedPromoStatus(state),
  isFilmsLoaded: getFilmsLoadedStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
  onChangeFavoriteStatus(id, activeStatus) {
    dispatch(postFavoriteStatusPromo(id, activeStatus));
  },
  onLoadPromo() {
    dispatch(fetchPromoFilm());
  },
  onResetLoadedStatus() {
    dispatch(ActionCreator.resetLoadedStatus());
  },
  onLoadData() {
    dispatch(fetchFilmsList());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
