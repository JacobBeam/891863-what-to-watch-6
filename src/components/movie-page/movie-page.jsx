import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TabsList from '../tabs-list/tabs-list';
import SimilarMovies from '../similar-movies/similar-movies';
import {fetchFilmById, fetchFilmComments, postFavoriteStatus} from '../../store/api-action';
import {AuthorizationStatus, AppRoute} from '../../utils/const';
import LoadingPage from '../loading-page/loading-page';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getSelectedFilmLoadedStatus, getSelectedMovie} from '../../store/film-data/selectors';
import {ActionCreator} from '../../store/action';

const MoviePage = (props) => {

  const {
    onFollowingToPlayer,
    onFollowingToMyList,
    selectedMovie,
    onLoadFilm,
    isSelectedFilmLoaded,
    authorizationStatus,
    onLoadComments,
    onResetLoadedStatus,
    onChangeFavoriteStatus
  } = props;

  const seachId = Number(props.match.params.id);

  useEffect(() => {
    onResetLoadedStatus();
  }, []);

  useEffect(() => {
    if (!isSelectedFilmLoaded || selectedMovie.id !== seachId) {
      onLoadFilm(seachId);
      onLoadComments(seachId);
    }
  }, [isSelectedFilmLoaded, selectedMovie, seachId]);

  if (!isSelectedFilmLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  return (
    <div>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={selectedMovie.backgroundImage} alt={selectedMovie.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
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
                </div> : <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
              }

            </div>
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{selectedMovie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{selectedMovie.genre}</span>
                <span className="movie-card__year">{selectedMovie.released}</span>
              </p>
              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={()=>onFollowingToPlayer(selectedMovie.id)}
                >
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>

                {(authorizationStatus === AuthorizationStatus.AUTH) ?
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={()=>onChangeFavoriteStatus(selectedMovie.id, selectedMovie.isFavorite)}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={(selectedMovie.isFavorite) ? `#del` : `#add`}></use>
                    </svg>
                    <span>My list</span>
                  </button> : ``}

                {authorizationStatus === AuthorizationStatus.AUTH && <Link to={`${AppRoute.FILMS}/${selectedMovie.id}${AppRoute.REVIEW}`} className="btn movie-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={selectedMovie.posterImage} alt={selectedMovie.name} width={218} height={327} />
            </div>
            <TabsList></TabsList>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <SimilarMovies></SimilarMovies>

        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>

  );
};

MoviePage.propTypes = {
  onFollowingToPlayer: PropTypes.func.isRequired,
  onFollowingToMyList: PropTypes.func.isRequired,
  onLoadFilm: PropTypes.func.isRequired,
  isSelectedFilmLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  selectedMovie: PropTypes.shape({
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  onResetLoadedStatus: PropTypes.func.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  selectedMovie: getSelectedMovie(state),
  isSelectedFilmLoaded: getSelectedFilmLoadedStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilm(id) {
    dispatch(fetchFilmById(id));
  },
  onLoadComments(id) {
    dispatch(fetchFilmComments(id));
  },
  onResetLoadedStatus() {
    dispatch(ActionCreator.resetLoadedStatus());
  },
  onChangeFavoriteStatus(id, activeStatus) {
    dispatch(postFavoriteStatus(id, activeStatus));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
