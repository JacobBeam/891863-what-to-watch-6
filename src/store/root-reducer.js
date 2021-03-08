import {combineReducers} from 'redux';
import {commentData} from './comment-data/comment-data';
import {filmData} from './film-data/film-data';
import {user} from './user/user';

export const NameSpace = {
  COMMENT_DATA: `COMMENT_DATA`,
  FILM_DATA: `FILM_DATA`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.COMMENT_DATA]: commentData,
  [NameSpace.FILM_DATA]: filmData,
  [NameSpace.USER]: user
});
