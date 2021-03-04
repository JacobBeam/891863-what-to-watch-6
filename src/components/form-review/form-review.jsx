import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {postComment} from '../../store/api-action';
import PropTypes from 'prop-types';
import {filmPropTypes} from '../../utils/prop-types';


const FormReview = (props)=>{

  const {
    isSentComment,
    selectedMovie,
    enableCommentFlag,
    onSubmitReview,
  } = props;

  const [reviewForm, setReviewForm] = useState({
    "rating": null,
    "review": ``,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    enableCommentFlag();
    onSubmitReview({
      rating: reviewForm.rating,
      comment: reviewForm.review
    }, selectedMovie.id);
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={handleSubmit}
      disabled={true}
    >
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
          <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-2">Rating 2</label>
          <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-3">Rating 3</label>
          <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-4">Rating 4</label>
          <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-5">Rating 5</label>
          <input className="rating__input" id="star-6" type="radio" name="rating" value="6"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-6">Rating 6</label>
          <input className="rating__input" id="star-7" type="radio" name="rating" value="7"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-7">Rating 7</label>
          <input className="rating__input" id="star-8" type="radio" name="rating" value="8"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-8">Rating 8</label>
          <input className="rating__input" id="star-9" type="radio" name="rating" value="9"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-9">Rating 9</label>
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10"
            onChange={handleFieldChange} disabled={isSentComment}/>
          <label className="rating__label" htmlFor="star-10">Rating 10</label>
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review" id="review" placeholder="Review text" defaultValue={``}
          onInput={handleFieldChange} disabled={isSentComment}/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(reviewForm.rating === null) || (reviewForm.review.length < 50 || reviewForm.review.length > 400) || isSentComment}>{isSentComment ? `...Posting` : `Post`}</button>
        </div>
      </div>
    </form>

  );
};

FormReview.propTypes = {
  isSentComment: PropTypes.bool.isRequired,
  selectedMovie: filmPropTypes.film,
  enableCommentFlag: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isSentComment: state.isSentComment,
  selectedMovie: state.selectedMovie
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
