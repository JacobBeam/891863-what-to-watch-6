import {ActionType} from '../action';

const initialState = {
  isSentComment: false,
  selectedComments: []
};

const commentData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.POST_COMMENT:
      return {
        ...state,
        isSentComment: false
      };
    case ActionType.ENABLE_COMMENT_FLAG:
      return {
        ...state,
        isSentComment: true
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        selectedComments: action.payload,
      };
  }

  return state;
};

export {commentData};
