import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import SignInPage from './sign-in-page';

const mockStore = configureStore({});

it(`Render 'SignInPage' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <SignInPage />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
