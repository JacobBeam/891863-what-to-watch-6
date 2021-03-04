import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {filmPropTypes} from '../../utils/prop-types';
import VideoPlayer from '../video-player/video-player';
import {connect} from 'react-redux';
import {fetchFilmById, fetchCommentsOnTheFilm} from '../../store/api-action';

const MovieCard = (props) =>{
  const {film, onAddActiveCard, onDeleteActiveCard, onLoadFilm, onLoadComments} = props;
  const {id, name} = film;

  const handleLoadInfo = (filmId) => {
    onLoadFilm(filmId);
    onLoadComments(filmId);
  };

  const handleMouseOver = (evt) => {
    onAddActiveCard(evt.currentTarget);
  };

  const handleMouseOut = () => {
    onDeleteActiveCard();
  };

  return (
    <article className="small-movie-card catalog__movies-card" data-film-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <VideoPlayer film={film}>
      </VideoPlayer>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`} onClick={()=>handleLoadInfo(id)}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {...filmPropTypes,
  onAddActiveCard: PropTypes.func.isRequired,
  onDeleteActiveCard: PropTypes.func.isRequired,
  onLoadFilm: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onLoadFilm(id) {
    dispatch(fetchFilmById(id));
  },
  onLoadComments(id) {
    dispatch(fetchCommentsOnTheFilm(id));
  }
});

export {MovieCard};
export default connect(null, mapDispatchToProps)(MovieCard);
