import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/const';
import App from './app';
import thunk from 'redux-thunk';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);

describe(`Test routing`, () => {
  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        films: [],
        isFilmsLoaded: true,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: `All genres`,
        promo: {},
        isPromoLoaded: true,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: true,
      }
    });
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it(`Render 'SignInPage' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(`/login`);
    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  });

  it(`Render 'MyListPage' when user navigate to '/mylist' url`, () => {
    const history = createMemoryHistory();
    history.push(`/mylist`);
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        favoritesFilms: [],
        isFavoritesFilmsLoaded: true,
      }
    });
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`Render 'MoviePage' when user navigate to '/films/:id' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        films: [],
        isFilmsLoaded: true,
        selectedMovie: {
          "starring": [],
          "id": 0,
        },
        isSelectedFilmLoaded: true,
      }
    });
    history.push(`/films/0`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it(`Render 'AddReviewPage' when user navigate to '/films/:id/review' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {
          "id": 0,
        },
        isSelectedFilmLoaded: true,
      },
      COMMENT_DATA: {
        isSentComment: false,
        selectedComments: []
      }
    });
    history.push(`/films/:id/review`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it(`Render 'PlayerPage' when user navigate to '/player/:id' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {},
        isSelectedFilmLoaded: true,
      },
    });
    history.push(`/player/:id`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to '/non-existent-route' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({});
    history.push(`/non-existent-route`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });

});
