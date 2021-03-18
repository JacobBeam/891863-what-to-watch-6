import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {postComment} from '../../store/api-action';
import PropTypes from 'prop-types';
import {filmPropTypes} from '../../utils/prop-types';
import {getSentCommentStatus} from '../../store/comment-data/selectors';
import {getSelectedMovie} from '../../store/film-data/selectors';
import RatingStarg from '../rating-stars/rating-stars';
import ReviewText from '../review-text/review-text';

const FormReview = (props)=>{

  const {
    isSentComment,
    selectedMovie,
    enableCommentFlag,
    onSubmitReview,
  } = props;

  const [reviewForm, setReviewForm] = useState({
    "review": ``,
  });

  const [ratingForm, setRatingForm] = useState({
    "rating": null,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    enableCommentFlag();
    onSubmitReview({
      rating: ratingForm.rating,
      comment: reviewForm.review
    }, selectedMovie.id);
  };

  const handleTextFieldChange = useCallback(
      (evt) => {
        const {name, value} = evt.target;
        setReviewForm({...reviewForm, [name]: value});
      }, [reviewForm]
  );

  const handleRatingFieldChange = useCallback(
      (evt) => {
        const {name, value} = evt.target;
        setRatingForm({...ratingForm, [name]: value});
      }, [ratingForm]
  );

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={handleSubmit}
      disabled={true}
    >
      <div className="rating">
        <RatingStarg onChangeInput={handleRatingFieldChange} isSentComment={isSentComment}></RatingStarg>
      </div>
      <div className="add-review__text">
        <ReviewText onChangeInput={handleTextFieldChange} isSentComment={isSentComment}></ReviewText>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(ratingForm.rating === null) || (reviewForm.review.length < 50 || reviewForm.review.length > 400) || isSentComment}>{isSentComment ? `...Posting` : `Post`}</button>
        </div>
      </div>
    </form>
  );
};

FormReview.propTypes = {
  isSentComment: PropTypes.bool,
  selectedMovie: filmPropTypes.film,
  enableCommentFlag: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isSentComment: getSentCommentStatus(state),
  selectedMovie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  enableCommentFlag() {
    dispatch(ActionCreator.enableCommentFlag());
  },
  onSubmitReview(dataReview, id) {
    dispatch(postComment(dataReview, id));
  }
});

export {FormReview};
export default connect(mapStateToProps, mapDispatchToProps)(FormReview);
