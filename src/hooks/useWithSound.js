import { useRef, useEffect } from 'react';

export const useWithSound = (audioSource) => {
  const soundRef = useRef();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSound = () => {
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.pause();
  };

  return {
    playSound,
    pauseSound,
  };
};
