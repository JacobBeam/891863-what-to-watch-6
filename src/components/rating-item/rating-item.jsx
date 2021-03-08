import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const RatingItem = (props) =>{

  const {id, onChangeInput, isSentComment} = props;

  return (
    <Fragment>
      <input className="rating__input" id={`star-${id}`} type="radio" name="rating" value={id}
        onChange={onChangeInput} disabled={isSentComment}/>
      <label className="rating__label" htmlFor={`star-${id}`}>Rating {id}</label>
    </Fragment>
  );
};

RatingItem.propTypes = {
  isSentComment: PropTypes.bool.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default React.memo(RatingItem);
