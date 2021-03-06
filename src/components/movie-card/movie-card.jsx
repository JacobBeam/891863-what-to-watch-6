import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {filmPropTypes} from '../../utils/prop-types';
import VideoPlayer from '../video-player/video-player';
import {AppRoute} from '../../utils/const';

const MovieCard = (props) =>{
  const {film, onAddActiveCard, onDeleteActiveCard} = props;
  const {id, name} = film;

  const handleMouseOver = (evt) => {
    onAddActiveCard(evt.currentTarget);
  };

  const handleMouseOut = () => {
    onDeleteActiveCard();
  };

  const history = useHistory();
  const handleCardClick = (() => {
    history.push(`${AppRoute.FILMS}/${id}`);
  });

  return (

    <article className="small-movie-card catalog__movies-card" data-film-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleCardClick}
    >
      <VideoPlayer film={film}>
      </VideoPlayer>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`${AppRoute.FILMS}/${id}`}
        >{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {...filmPropTypes,
  onAddActiveCard: PropTypes.func.isRequired,
  onDeleteActiveCard: PropTypes.func.isRequired
};

export default MovieCard;
