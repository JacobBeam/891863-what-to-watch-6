import React, {Fragment} from 'react';
import {findRatingLevel} from '../../utils/utils';
import {filmPropTypes} from '../../utils/prop-types';
import {connect} from 'react-redux';
import {getSelectedMovie} from '../../store/film-data/selectors';

const TabOverview = (props)=>{

  const {film} = props;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating}
        </div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{findRatingLevel(film.rating)}</span>
          <span className="movie-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{film.description}</p>
        <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
        <p className="movie-card__starring"><strong>{film.starring.join(`, `)}</strong></p>
      </div>

    </Fragment>
  );
};

TabOverview.propTypes = filmPropTypes;

const mapStateToProps = (state) => ({
  film: getSelectedMovie(state)
});

export default connect(mapStateToProps, null)(TabOverview);
