import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ isActive, reset }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (reset) {
      setSeconds(0);
    }
  }, [reset]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="timer">
      <p>Tiempo: {formatTime(seconds)}</p>
    </div>
  );
};

Timer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
};

export default Timer;