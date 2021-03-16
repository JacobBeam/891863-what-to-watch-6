import {user} from './user';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {ActionCreator, ActionType} from '../action';
import {checkAuth, login, logout} from '../api-action';
import {AuthorizationStatus} from '../../utils/const';

const api = createAPI(() => {});

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH, user:{}});
  });

  it(`Reducer should update authorizationStatus to 'auth'`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {status:AuthorizationStatus.AUTH}
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it(`Reducer should update user information`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {status:AuthorizationStatus.AUTH, user: {
        "id": 1,
        "email": "test@gmail.com",
        "name": "Test",
        "avatar_url": "img/1.png"
      }}
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH, user: {
        "id": 1,
        "email": "test@gmail.com",
        "name": "Test",
        "avatar_url": "img/1.png"
      }});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status:AuthorizationStatus.AUTH, user:{}},
        });
      });
  });

  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(`/logout`)
      .reply(200, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status:AuthorizationStatus.NO_AUTH, user:{}},
        });
      });
  });

  it(`Should make a correct API call to /login with login/password`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: {status:AuthorizationStatus.AUTH, user:[{fake: true}]},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      });
  });
});
