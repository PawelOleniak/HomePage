import { createContext, useEffect, useState } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';


export const Context = createContext();


const Provider = ({ children }) => {

  const [isDay, setIsDay] = useState(false);

  const checkTime = () => {

        navigator.geolocation.getCurrentPosition(function(position) {
         const sunRise=getSunrise(position.coords.latitude, position.coords.longitude).getTime();
         const sunSet=getSunset(position.coords.latitude, position.coords.longitude).getTime();

         const currentTime = new Date().getTime();

        setIsDay(currentTime > sunRise && currentTime < sunSet ? true : false);

      });
  };
  useEffect(() => {

    checkTime();
  }, []);

const ContextValue = {
    isDay,
  };

return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

  export default Provider;