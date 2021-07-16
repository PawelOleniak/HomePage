import { createContext, useEffect, useState } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import { useMediaQuery } from 'react-responsive';

export const Context = createContext();

const Provider = ({ children }) => {
  const minute = new Date().getUTCMinutes();
  const [isDay, setIsDay] = useState(false);
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1400 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 850 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  useEffect(() => {
    checkTime();
  }, [minute]);

  const checkTime = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const sunRise = getSunrise(position.coords.latitude, position.coords.longitude).getTime();
      const sunSet = getSunset(position.coords.latitude, position.coords.longitude).getTime();
      const currentTime = new Date().getTime();
      setIsDay(currentTime > sunRise && currentTime < sunSet ? true : false);
    });
  };
  const ContextValue = {
    isDay,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
  };

  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

export default Provider;
