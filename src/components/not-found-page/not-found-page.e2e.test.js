import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';


it(`Should MovieCard render correctly`, () => {
  const history = createMemoryHistory();

  render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>);

  expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
});
