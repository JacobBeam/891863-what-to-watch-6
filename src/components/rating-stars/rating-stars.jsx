import React from 'react';
import {amountOfStars} from '../../utils/const';
import RatingItem from '../rating-item/rating-item';
import PropTypes from 'prop-types';

const keyName = `star`;
const RatingStars = (props) =>{

  const {onChangeInput, isSentComment} = props;
  const inputList = new Array(amountOfStars).fill(null);

  return (
    <div className="rating__stars">
      {inputList.map((_input, index)=>{
        return <RatingItem
          key={keyName + index}
          id={index + 1}
          onChangeInput={onChangeInput}
          isSentComment={isSentComment}
        ></RatingItem>;
      })
      }
    </div>
  );
};

RatingStars.propTypes = {
  isSentComment: PropTypes.bool,
  onChangeInput: PropTypes.func.isRequired
};

export default React.memo(RatingStars);
