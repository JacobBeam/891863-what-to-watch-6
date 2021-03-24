import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {allGenreFilter} from '../../utils/const';
import PropTypes from 'prop-types';
import {START_COUNT_FILMS_IN_LIST} from '../../utils/const';
import {getGenre, getFilms} from '../../store/film-data/selectors';

const GenreItem = (props) => {

  const {name, genre, changeGenre, resetGenre, onResetCountFilms} = props;
  const isReset = (name === allGenreFilter.ALL_GENRES) ? true : false;

  const handleCountFilmsReset = () => {
    onResetCountFilms(START_COUNT_FILMS_IN_LIST);
  };

  return (
    <li className={`catalog__genres-item ${name === genre ? `catalog__genres-item--active` : ``}`}
      onClick={(evt)=>{
        evt.preventDefault();
        if (isReset) {
          resetGenre();
        } else {
          changeGenre(name);
        }
        handleCountFilmsReset();
      }}>
      <a href="#" className="catalog__genres-link">{name}</a>
    </li>);
};

GenreItem.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  resetGenre: PropTypes.func.isRequired,
  onResetCountFilms: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  resetGenre() {
    dispatch(ActionCreator.resetGenre());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreItem);
