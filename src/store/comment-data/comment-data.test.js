import {commentData} from './comment-data';
import {ActionCreator, ActionType} from '../action';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {postComment, fetchFilmComments} from '../api-action';

const api = createAPI(() => {});

const comments = [
  {
    "id": 1,
    "user": {
      "id": 13,
      "name": "Zak"
    },
    "rating": 1.4,
    "comment": "This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.",
    "date": "2021-03-07T08:04:28.658Z"
  },
  {
    "id": 2,
    "user": {
      "id": 17,
      "name": "Emely"
    },
    "rating": 7.2,
    "comment": "This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.",
    "date": "2021-02-22T08:04:28.658Z"
  }
]

const newComment = {
  rating: 0,
  comment: `test comment`
};

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(commentData(undefined, {}))
      .toEqual({
        isSentComment: false,
        selectedComments: []
      });
  });
  it(`Reducer should reset genre`, () => {
    const state = {
      isSentComment: false,
      selectedComments: []
    };

    expect(commentData(state, ActionCreator.enableCommentFlag()))
      .toEqual({
        isSentComment: true,
        selectedComments: []});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 0;
    const fetchCommentsLoader = fetchFilmComments(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, comments);

    return fetchCommentsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: comments,
        });
      });
  });

  it(`Should make a correct API call to post /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 0;
    const rating = 0
    const comment = `test`

    const postCommentsLoader = postComment({rating, comment}, id);

    apiMock
      .onPost(`/comments/${id}`, {rating, comment})
      .reply(200, {rating, comment});

    return postCommentsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_COMMENT,
          payload: {rating, comment},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: {rating, comment},
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/films/${id}`,
        });
      });
  });
});
