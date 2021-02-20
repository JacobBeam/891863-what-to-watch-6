import React from 'react';
import {commentPropTypes} from '../../utils/prop-types';

const Comment = (props)=>{

  const {comment} = props;

  const dateComment = new Date(Date.parse(comment.date));
  const formattedDAte = dateComment.toLocaleString(`en-Us`, {month: `long`, year: `numeric`, day: `numeric`});

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={`${dateComment.getFullYear()}-${dateComment.getMonth() + 1}-${dateComment.getDay()}`}>{formattedDAte}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{comment.rating}</div>
    </div>
  );
};

Comment.propTypes = commentPropTypes;

export default Comment;
