import React from 'react';
import {act} from 'react-dom/test-utils';
import {fireEvent, render, screen} from '@testing-library/react';
import VideoPlayer from './video-player';

describe(`Test VideoPlayer`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => { };
    window.HTMLMediaElement.prototype.load = () => { };
  });

  it(`VideoPlayer should be render correctly`, () => {
    const mockProps = {};
    render(
        <VideoPlayer
          film={mockProps}
        />
    );

    expect(screen.getByTestId(`videoplayer`)).toBeInTheDocument();

  });

  it(`VideoPlayer should play when mouse enter or leave element`, () => {

    jest.useFakeTimers();

    const mockProps = {};
    const spyPlay = jest.spyOn(window.HTMLMediaElement.prototype, `play`).mockImplementation(() => { });
    const spyLoad = jest.spyOn(window.HTMLMediaElement.prototype, `load`).mockImplementation(() => { });

    const {container} = render(
        <VideoPlayer
          film={mockProps}
        />
    );

    expect(spyPlay).not.toHaveBeenCalled();
    expect(spyLoad).not.toHaveBeenCalled();

    const videoElement = container.querySelector(`video`);

    act(() => {
      fireEvent.mouseEnter(videoElement);
    });
    jest.runAllTimers();
    expect(spyPlay).toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(videoElement);
    });
    jest.runAllTimers();
    expect(spyLoad).toHaveBeenCalled();
  });
});
