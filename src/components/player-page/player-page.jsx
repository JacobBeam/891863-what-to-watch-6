import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {filmPropTypes} from '../../utils/prop-types';
import {connect} from 'react-redux';
import {getSelectedFilmLoadedStatus, getSelectedMovie} from '../../store/film-data/selectors';
import {fetchFilmById} from '../../store/api-action';
import LoadingPage from '../loading-page/loading-page';
import {convertSecondsForVideo} from '../../utils/utils';

const startTime = `00:00:00`;

const PlayerPage = (props) => {

  const {selectedMovie, isSelectedFilmLoaded, onLoadFilm, onFollowingGoBack} = props;
  const seachId = Number(props.match.params.id);

  const [playStatus, setPlayStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(startTime);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);

  const fullVideoRef = useRef(``);

  useEffect(() => {
    if (!isSelectedFilmLoaded) {
      onLoadFilm(seachId);
    }
  }, [isSelectedFilmLoaded]);

  if (!isSelectedFilmLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  const handleVideoPlay = () => {
    setPlayStatus(true);
    fullVideoRef.current.play();
  };

  const handleVideoPause = () => {
    setPlayStatus(false);
    fullVideoRef.current.pause();
  };

  const handleFullScreenToggle = ()=> {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreenStatus(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreenStatus(false);
      }
    }
  };

  const handleProgressUpdate = () => {
    setProgress((fullVideoRef.current.currentTime / fullVideoRef.current.duration) * 100);
    setElapsedTime(convertSecondsForVideo(fullVideoRef.current.duration - fullVideoRef.current.currentTime));
  };


  return (

    <div className="player">
      <video
        src={selectedMovie.videoLink}
        className="player__video"
        poster={selectedMovie.backgroundImage}
        ref={fullVideoRef}
        onTimeUpdate={handleProgressUpdate}
      />
      <button
        type="button"
        className="player__exit"
        data-testid="exit"
        onClick={() => {
          onFollowingGoBack();
          if (fullScreenStatus) {
            document.exitFullscreen();
            setFullScreenStatus(false);
          }
        }}
      >
        Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max={100} />
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{elapsedTime}</div>
        </div>
        <div className="player__controls-row">


          {!playStatus &&
          <button
            type="button"
            className="player__play"
            onClick={() => handleVideoPlay()}
            data-testid="play"
          >
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          }

          {playStatus &&
          <button
            type="button"
            className="player__play"
            onClick={() => handleVideoPause()}
            data-testid="pause"
          >
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          }
          <div className="player__name">{selectedMovie.name}</div>
          <button
            onClick={() => handleFullScreenToggle()}
            type="button"
            className="player__full-screen"
            data-testid="full-screen"
          >
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>

  );
};

PlayerPage.propTypes = {
  onFollowingGoBack: PropTypes.func.isRequired,
  selectedMovie: filmPropTypes.film,
  isSelectedFilmLoaded: PropTypes.bool.isRequired,
  onLoadFilm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
};

const mapStateToProps = (state) => ({
  selectedMovie: getSelectedMovie(state),
  isSelectedFilmLoaded: getSelectedFilmLoadedStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFilm(id) {
    dispatch(fetchFilmById(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
