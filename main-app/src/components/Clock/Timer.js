import React, { useState, useEffect } from 'react';
import { TimerText } from './ClockBoxCss';

const Time = (current) => {
  const [date, setDate] = useState(current);

  useEffect(() => {
    let timer = setInterval(() => tick(), 10000);
    return function clear() {
      clearInterval(timer);
    };
  }, []);

  function tick() {
    setDate(new Date());
  }

  return date;
};

function Timer({ isTabletOrMobile, isBigScreen }) {
  const time = Time(new Date());
  return (
    <TimerText isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile}>
      {time.toLocaleTimeString().substring(0, 5)}
    </TimerText>
  );
}
export default Timer;
