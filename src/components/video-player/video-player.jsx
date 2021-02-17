import React, {Fragment, useEffect, useRef} from 'react';
import {filmPropTypes} from '../../utils/prop-types';

const VideoPlayer = (props)=> {
  const {film} = props;
  const {previewImage, previewVideoLink} = film;

  const videoRef = useRef(``);
  let timer = ``;

  useEffect(()=> {

    videoRef.current.onmouseenter = () => {
      timer = setTimeout(() => {
        videoRef.current.play();
      }, 1000);
    };

    videoRef.current.onmouseleave = () => {
      clearTimeout(timer);
      videoRef.current.load();
    };

    return () => {
      clearTimeout(timer);
      videoRef.current.onmouseenter = null;
      videoRef.current.onmouseleave = null;
    };

  }, []);

  return (
    <Fragment>

      <video
        src={previewVideoLink}
        ref={videoRef}
        width="280"
        height="175"
        muted
        poster = {previewImage}
      >
      </video>
    </Fragment>
  );
};

VideoPlayer.propTypes = filmPropTypes;

export default VideoPlayer;
