import React, {useState} from 'react';
import MovieCard from '../movie-card/movie-card';
import {filmsPropTypes, filmPropTypes} from '../../utils/prop-types';

const SIMILAR_MOVIES_COUNT = 4;

const SimilarMovies = (props)=> {

  const [activeFilmCard, setActiveFilmCard] = useState({id: ``});
  const {films, activeFilm} = props;

  const handleAddActiveCard = (currentTarget) => {
    setActiveFilmCard({...activeFilmCard, id: currentTarget.dataset.filmId});
  };

  const handleDeleteActiveCard = () => {
    setActiveFilmCard({...activeFilmCard, id: ``});
  };

  return (
    <div className="catalog__movies-list">
      {films.filter((element)=>element.genre === activeFilm.genre && element.id !== activeFilm.id)
      .slice(0, SIMILAR_MOVIES_COUNT)
      .map((element)=><MovieCard
        key={element.id}
        film={element}
        onAddActiveCard={handleAddActiveCard}
        onDeleteActiveCard={handleDeleteActiveCard}
      ></MovieCard>)}
    </div>
  );
};

SimilarMovies.propTypes = {...filmsPropTypes,
  ...filmPropTypes.film};

export default SimilarMovies;
