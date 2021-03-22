import React from 'react';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import MainPage from './main-page';
import {AuthorizationStatus} from '../../utils/const';
import userEvent from '@testing-library/user-event';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const onFollowingToPlayer = jest.fn();
const onFollowingToMyList = jest.fn();

describe(`Test routing`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {
      films: [{"id": 1, "genre": `Test`},
        {"id": 2, "genre": `All genres`}],
      promo: {
        "genre": `Test`,
        "id": 0,
        "backgroundImage": `Test image`,
        "name": `test name`,
        "poster_image": `Test poster`,
        "released": 2015,
        "isFavorite": false,
      },
      isPromoLoaded: true,
      isFilmsLoaded: true,
      genre: `Test`}
  });
  it(`MainPage should play after the play button is pressed`, () => {
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MainPage onFollowingToMyList={onFollowingToMyList} onFollowingToPlayer={onFollowingToPlayer}/>
          </Router>
        </redux.Provider>
    );

    userEvent.click(screen.getByTestId(`play`));
    expect(onFollowingToPlayer).toBeCalled();
  });

  it(`MainPage should be go to MyList`, () => {
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <MainPage onFollowingToMyList={onFollowingToMyList} onFollowingToPlayer={onFollowingToPlayer}/>
          </Router>
        </redux.Provider>
    );

    userEvent.click(screen.getByTestId(`my-list`));
    expect(onFollowingToMyList).toBeCalled();
  });
});
