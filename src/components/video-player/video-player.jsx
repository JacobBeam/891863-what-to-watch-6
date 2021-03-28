import React, {Fragment, useEffect, useRef} from 'react';
import {filmPropTypes} from '../../utils/prop-types';

const TIMEOUT_IN_MS = 1000;

const VideoPlayer = (props)=> {
  const {film} = props;
  const {previewImage, previewVideoLink} = film;

  const videoRef = useRef(``);
  let timer = ``;

  useEffect(()=> {

    videoRef.current.onmouseenter = () => {
      timer = setTimeout(() => {
        videoRef.current.src = previewVideoLink;
        videoRef.current.play();
      }, TIMEOUT_IN_MS);
    };

    videoRef.current.onmouseleave = () => {
      clearTimeout(timer);
      videoRef.current.src = ``;
      videoRef.current.load();
    };

    return () => {
      clearTimeout(timer);
      videoRef.current.onmouseenter = null;
      videoRef.current.onmouseleave = null;
      videoRef.current.src = ``;
    };

  }, []);

  return (
    <Fragment>
      <video
        ref={videoRef}
        width="280"
        height="175"
        muted
        poster = {previewImage}
        data-testid="videoplayer"
      >
      </video>
    </Fragment>
  );
};

VideoPlayer.propTypes = filmPropTypes;

export default VideoPlayer;
