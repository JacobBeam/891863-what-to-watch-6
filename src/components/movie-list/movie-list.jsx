import React, {useState} from 'react';
import MovieCard from '../movie-card/movie-card';
import {filmsPropTypes} from '../../utils/prop-types';

const MovieList = (props) => {
  const [activeFilmCard, setActiveFilmCard] = useState({id: ``});
  const {films, countFilmsInList} = props;

  const handleAddActiveCard = (currentTarget) => {
    setActiveFilmCard({...activeFilmCard, id: currentTarget.dataset.filmId});
  };

  const handleDeleteActiveCard = () => {
    setActiveFilmCard({...activeFilmCard, id: ``});
  };

  return (
    <div className="catalog__movies-list">
      {
        films
        .slice(0, countFilmsInList)
        .map((element)=><MovieCard
          key={element.id}
          film={element}
          onAddActiveCard={handleAddActiveCard}
          onDeleteActiveCard={handleDeleteActiveCard}
        ></MovieCard>)
      }
    </div>
  );
};

MovieList.propTypes = filmsPropTypes;

export default MovieList;
