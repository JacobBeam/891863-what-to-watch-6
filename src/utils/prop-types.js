import PropTypes from 'prop-types';

export const filmPropTypes = {
  film: PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number,
    genre: PropTypes.string,
    released: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoLink: PropTypes.string,
    previewVideoLink: PropTypes.string,
  }),
};


export const filmsPropTypes = {
  films: PropTypes.arrayOf(filmPropTypes.film).isRequired
};

export const commentPropTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    date: PropTypes.string.isRequired,
  }).isRequired
};


export const commentsPropTypes = {
  comments: PropTypes.arrayOf(commentPropTypes.comment).isRequired
};
