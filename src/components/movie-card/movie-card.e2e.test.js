import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MovieCard from './movie-card';

const film = {id: 0, name: `test`}
const onAddActiveCard = jest.fn();
const onDeleteActiveCard = jest.fn();
it(`Should MovieCard render correctly`, () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <MovieCard
        film={film}
        onAddActiveCard={onAddActiveCard}
        onDeleteActiveCard={onDeleteActiveCard} />
    </Router>);

  expect(screen.getByText(`${film.name}`)).toBeInTheDocument();
});