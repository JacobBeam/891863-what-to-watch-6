import React from 'react';
import Comment from '../comment/comment';
import {commentsPropTypes} from '../../utils/prop-types';
import {connect} from 'react-redux';
import {getSelectedComments} from '../../store/comment-data/selectors';

const TabReviews = (props)=>{

  const {comments} = props;
  const commentInCollumn = Math.ceil(comments.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {comments.slice(0, commentInCollumn).map((element)=>{
          return (<Comment key={element.id} comment={element}></Comment>);
        })
        }
      </div>
      <div className="movie-card__reviews-col">
        {comments.slice(commentInCollumn).map((element)=>{
          return (<Comment key={element.id} comment={element}></Comment>);
        })
        }
      </div>
    </div>
  );
};

TabReviews.propTypes = commentsPropTypes;

const mapStateToProps = (state) => ({
  comments: getSelectedComments(state)
});


export {TabReviews};
export default connect(mapStateToProps, null)(TabReviews);
