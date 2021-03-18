import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MovieCard from './movie-card';

const film = {id: 0,
  isFavorite: true,
  name: `test`,
  genre: `Drama`,
  videLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`};
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
