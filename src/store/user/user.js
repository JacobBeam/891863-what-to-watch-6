import {ActionType} from '../action';
import {AuthorizationStatus} from '../../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload.status,
        user: action.payload.user
      };
  }

  return state;
};

export {user};
