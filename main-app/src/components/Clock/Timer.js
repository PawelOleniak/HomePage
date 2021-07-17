import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Timer({ isTabletOrMobile, isBigScreen }) {
  const time = Time(new Date());
  return (
    <TimerText isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile}>
      {time.toLocaleTimeString().substring(0, 5)}
    </TimerText>
  );
}
const TimerText = styled.h2`
  position: absolute;
  z-index: 15;
  margin-top: calc(24px + 2vw);
  background: transparent;
  font-family: 'arial';
  margin-left: calc(3.5vw + 28px);
`;

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

export default Timer;
