import { useState } from 'react';

const AudioPlayer = (): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSrc = '/audio/cowboy-bebop-lofi.mp3';
  // const handlePlay = () => {
  //   setIsPlaying(true);
  // };

  // const handlePause = () => {
  //   setIsPlaying(false);
  // };

  return (
    <div className="audio__container">
      <audio
        className="audio__player"
        src={audioSrc}
        controls={isPlaying ? false : true}
      />
    </div>
  );
};

export default AudioPlayer;
