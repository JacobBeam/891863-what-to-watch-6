import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import {filmsPropTypes, filmPropTypes} from '../../utils/prop-types';
import {getFilms, getSelectedMovie, getFilmsLoadedStatus} from '../../store/film-data/selectors';
import {fetchFilmsList} from '../../store/api-action';
import LoadingPage from '../loading-page/loading-page';

const SIMILAR_MOVIES_COUNT = 4;

const SimilarMovies = (props)=> {

  const [activeFilmCard, setActiveFilmCard] = useState({id: ``});
  const {films, selectedMovie, isFilmsLoaded, onLoadFilms} = props;

  useEffect(() => {
    if (!isFilmsLoaded) {
      onLoadFilms();
    }
  }, [isFilmsLoaded]);

  if (!isFilmsLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  const handleActiveCardAdd = (currentTarget) => {
    setActiveFilmCard({...activeFilmCard, id: currentTarget.dataset.filmId});
  };

  const handleActiveCardDelete = () => {
    setActiveFilmCard({...activeFilmCard, id: ``});
  };

  return (
    <div className="catalog__movies-list">
      {films.filter((element)=>element.genre === selectedMovie.genre && element.id !== selectedMovie.id)
      .slice(0, SIMILAR_MOVIES_COUNT)
      .map((element)=><MovieCard
        key={element.id}
        film={element}
        onAddActiveCard={handleActiveCardAdd}
        onDeleteActiveCard={handleActiveCardDelete}
      ></MovieCard>)}
    </div>
  );
};

SimilarMovies.propTypes = {...filmsPropTypes,
  selectedMovie: filmPropTypes.film,
  isFilmsLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  isFilmsLoaded: getFilmsLoadedStatus(state),
  selectedMovie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilms() {
    dispatch(fetchFilmsList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SimilarMovies);
