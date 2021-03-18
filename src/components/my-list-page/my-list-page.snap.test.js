import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import MyListPage from './my-list-page';
import {AuthorizationStatus} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);

it(`Should MyListPage render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {
      favoritesFilms: [],
      isFavoritesFilmsLoaded: true
    },
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <MyListPage/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
