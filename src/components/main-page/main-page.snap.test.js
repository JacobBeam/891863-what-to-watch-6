import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import MainPage from './main-page';
import {AuthorizationStatus} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const onFollowingToPlayer = jest.fn();
const onFollowingToMyList = jest.fn();

it(`Should MainPage render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {films: [{"id": 2, "genre": `Test`}, {"id": 1, "genre": `All`}],
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

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <MainPage onFollowingToMyList={onFollowingToMyList} onFollowingToPlayer={onFollowingToPlayer}/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
