import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import PlayerPage from './player-page';
import {AuthorizationStatus} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const onFollowingGoBack = jest.fn();
const defaultProps = {
  match: {params: {id: `0`}},
};
it(`Should PlayerPage render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {
      selectedMovie: {
        "name": `Macbeth`,
        "backgroundImage": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Macbeth.jpg`,
        "videoLink": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
      },
      isSelectedFilmLoaded: true}
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <PlayerPage {...defaultProps} onFollowingGoBack={onFollowingGoBack}/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
