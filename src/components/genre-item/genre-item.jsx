import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {allGenreFilter} from '../../utils/const';
import PropTypes from 'prop-types';

const GenreItem = (props) => {

  const {name, genre, changeGenre, resetGenre} = props;
  const isReset = (name === allGenreFilter.ALL_GENRES) ? true : false;

  return (
    <li className={`catalog__genres-item ${name === genre ? `catalog__genres-item--active` : ``}`}
      onClick={(evt)=>{
        evt.preventDefault();
        if (isReset) {
          resetGenre();
        } else {
          changeGenre(name);
        }
      }}>
      <a href="#" className="catalog__genres-link">{name}</a>
    </li>);
};

GenreItem.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  resetGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  films: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  resetGenre() {
    dispatch(ActionCreator.resetGenre());
  }
});

export {GenreItem};
export default connect(mapStateToProps, mapDispatchToProps)(GenreItem);
