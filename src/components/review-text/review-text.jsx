import React from 'react';
import PropTypes from 'prop-types';

const ReviewText = (props)=> {

  const {onChangeInput, isSentComment} = props;

  return (
    <textarea className="add-review__textarea" name="review" id="review" placeholder="Review text" defaultValue={``}
      onInput={onChangeInput} disabled={isSentComment}/>
  );
};

ReviewText.propTypes = {
  isSentComment: PropTypes.bool.isRequired,
  onChangeInput: PropTypes.func.isRequired
};


export default React.memo(ReviewText);
