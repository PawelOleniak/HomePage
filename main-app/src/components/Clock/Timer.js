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
  position: fixed;
  z-index: 15;
  margin-top: calc(32px + 1.1vw);
  background: transparent;
  font-family: 'arial';
  left: ${({ isTabletOrMobile }) => (isTabletOrMobile ? 'calc(49vw - 20px)' : 'calc(49vw - 27px)')};
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
