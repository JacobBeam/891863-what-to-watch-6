import React from 'react';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, screen} from '@testing-library/react';
import PlayerPage from './player-page';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const onFollowingGoBack = jest.fn();
const defaultProps = {
  match: {params: {id: `0`}},
};

describe(`Test PlayerPage`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => { };
    window.HTMLMediaElement.prototype.pause = () => { };
    window.document.documentElement.requestFullscreen = () => { };
  });

  it(`PlayerPage should be render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {
          "name": `Macbeth`,
          "backgroundImage": `mock-image-path`,
          "videoLink": `mock-link-path`,
        },
        isSelectedFilmLoaded: true
      }
    });

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <PlayerPage {...defaultProps} onFollowingGoBack={onFollowingGoBack} />
          </Router>
        </redux.Provider>
    );

    expect(container.querySelector(`video`)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it(`PlayerPage should play after the play/pause button is pressed`, () => {
    const spyPlay = jest.spyOn(window.HTMLMediaElement.prototype, `play`).mockImplementation(() => { });
    const spyPause = jest.spyOn(window.HTMLMediaElement.prototype, `pause`).mockImplementation(() => { });

    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {
          "name": `Macbeth`,
          "backgroundImage": `mock-image-path`,
          "videoLink": `mock-link-path`,
        },
        isSelectedFilmLoaded: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <PlayerPage {...defaultProps} onFollowingGoBack={onFollowingGoBack} />
          </Router>
        </redux.Provider>
    );

    expect(spyPlay).not.toHaveBeenCalled();
    expect(spyPause).not.toHaveBeenCalled();

    act(() => {
      fireEvent.click(screen.getByTestId(`play`));
    });
    expect(spyPlay).toBeCalled();

    act(() => {
      fireEvent.click(screen.getByTestId(`pause`));
    });
    expect(spyPause).toBeCalled();
  });


  it(`PlayerPage should play after the fullscreen button is pressed`, () => {
    const spyFullScreenOn = jest.spyOn(window.document.documentElement, `requestFullscreen`).mockImplementation(() => { });
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {
          "name": `Macbeth`,
          "backgroundImage": `mock-image-path`,
          "videoLink": `mock-link-path`,
        },
        isSelectedFilmLoaded: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <PlayerPage {...defaultProps} onFollowingGoBack={onFollowingGoBack} />
          </Router>
        </redux.Provider>
    );

    expect(spyFullScreenOn).not.toHaveBeenCalled();

    act(() => {
      fireEvent.click(screen.getByTestId(`full-screen`));
    });
    expect(spyFullScreenOn).toBeCalled();
  });

  it(`PlayerPage should exit after exit button is pressed`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FILM_DATA: {
        selectedMovie: {
          "name": `Macbeth`,
          "backgroundImage": `mock-image-path`,
          "videoLink": `mock-link-path`,
        },
        isSelectedFilmLoaded: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <PlayerPage {...defaultProps} onFollowingGoBack={onFollowingGoBack} />
          </Router>
        </redux.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId(`exit`));
    });
    expect(onFollowingGoBack).toBeCalled();
  });
});
