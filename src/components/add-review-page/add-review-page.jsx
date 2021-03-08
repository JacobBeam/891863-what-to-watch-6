import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FormReview from '../form-review/form-review';
import PropTypes from 'prop-types';
import LoadingPage from '../loading-page/loading-page';
import {fetchFilmById, fetchFilmComments} from '../../store/api-action';
import {getSelectedMovie, getSelectedFilmLoadedStatus} from '../../store/film-data/selectors';

const AddReviewPage = (props) =>{

  const {isSelectedFilmLoaded, selectedMovie, onLoadFilm, onLoadComments} = props;
  const seachId = Number(props.match.params.id);

  useEffect(() => {
    if (!isSelectedFilmLoaded) {
      onLoadFilm(seachId);
      onLoadComments(seachId);
    }
  }, [isSelectedFilmLoaded]);

  if (!isSelectedFilmLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={selectedMovie.backgroundImage} alt={selectedMovie.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${selectedMovie.id}`} className="breadcrumbs__link">{selectedMovie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
            </div>
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={selectedMovie.posterImage} alt={selectedMovie.name} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <FormReview></FormReview>
      </div>
    </section>
  );
};

AddReviewPage.propTypes = {
  isSelectedFilmLoaded: PropTypes.bool.isRequired,
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
  onLoadFilm: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = (state) => ({
  isSelectedFilmLoaded: getSelectedFilmLoadedStatus(state),
  selectedMovie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({

  onLoadFilm(id) {
    dispatch(fetchFilmById(id));
  },
  onLoadComments(id) {
    dispatch(fetchFilmComments(id));
  }
});


export {AddReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);
