import React, { Fragment } from 'react';
import { Clock, IMG } from './ClockBoxCss';
import Sun from './sun.png';
import Moon from './moon.png';
import Timer from './Timer';

function ClockBox({ isDay }) {
  return (
    <Fragment>
      <IMG isDay={isDay}>
        <Clock />
        {isDay ? <img src={Sun} alt="" /> : <img src={Moon} alt="" />}
        <Timer />
      </IMG>
    </Fragment>
  );
}
export default ClockBox;
