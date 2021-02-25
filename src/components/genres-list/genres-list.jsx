import React from 'react';
import {connect} from 'react-redux';
import {allGenreFilter} from '../../utils/const';
import GenreItem from '../genre-item/genre-item';
import {filmsPropTypes} from '../../utils/prop-types';

const GenreList = (props) =>{

  const {films} = props;
  const uniqueGenres = Array.from(new Set(films.map((film)=>film.genre)));
  uniqueGenres.unshift(allGenreFilter.ALL_GENRES);

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((element, index)=>{
        return <GenreItem key={element + index} name={element}>{element}</GenreItem>;
      })}
    </ul>
  );
};

GenreList.propTypes = filmsPropTypes;

const mapStateToProps = (state) => ({
  films: state.films,
});

export {GenreList};
export default connect(mapStateToProps, null)(GenreList);
