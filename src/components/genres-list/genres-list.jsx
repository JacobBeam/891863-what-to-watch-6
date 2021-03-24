import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {allGenreFilter} from '../../utils/const';
import GenreItem from '../genre-item/genre-item';
import {filmsPropTypes} from '../../utils/prop-types';
import {START_COUNT_FILMS_IN_LIST} from '../../utils/const';
import {getFilms} from '../../store/film-data/selectors';

const GenreList = (props) =>{

  const {films, setStartCountFilmsInList} = props;
  const uniqueGenres = Array.from(new Set(films.map((film)=>film.genre)));
  uniqueGenres.unshift(allGenreFilter.ALL_GENRES);

  const handleCountFilmsReset = () => {
    setStartCountFilmsInList(START_COUNT_FILMS_IN_LIST);
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((element, index)=>{
        return <GenreItem
          key={element + index}
          name={element}
          onResetCountFilms={handleCountFilmsReset}>{element}
        </GenreItem>;
      })}
    </ul>
  );
};

GenreList.propTypes = {
  ...filmsPropTypes,
  setStartCountFilmsInList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
});

export default connect(mapStateToProps, null)(GenreList);
