import React, { useContext } from 'react';
import { Clock, IMG } from './ClockBoxCss';
import Timer from './Timer';
import { HiSun } from 'react-icons/hi';
import { FaMoon } from 'react-icons/fa';
import { Context } from 'Context';
function ClockBox() {
  const { isDay, isBigScreen, isTabletOrMobile } = useContext(Context);
  return (
    <>
      <IMG isDay={isDay} isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile}>
        <Clock isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile} />
        {isDay ? <HiSun className="icon" size={40} /> : <FaMoon className="icon" size={40} />}
        <Timer isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile} />
      </IMG>
    </>
  );
}
export default ClockBox;
