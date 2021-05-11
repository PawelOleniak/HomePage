import React, { useEffect, useRef }  from "react";
import styled from "styled-components"
import CircleType from 'circletype';

function Timer(){
    const time = Time(new Date());
    const circle = useRef();
    let ScreenWidth = window.innerWidth;
    useEffect(() => {
        new CircleType(circle.current).radius((65-8000/(ScreenWidth))).dir(-1);
      }, [time]);

    return(
        <TimerText ref={circle}>{time.toLocaleTimeString()}</TimerText>
    )
}
const TimerText=styled.h2`
position:fixed;
z-index:15;
margin-top:calc(17px + 1.1vw);
font-size:calc(0.8vw + 10px);
background: transparent;
font-family: "arial";
left: calc(49vw - 7px);
`

const Time = (current) => {
    const [date, setDate] = React.useState(current);

    React.useEffect(() => {
      let timer = setInterval( () => tick(), 1000 );
      return function clear() {
          clearInterval(timer);
        };
     });

    function tick() {
      setDate(new Date());
     }

    return date;
}

export default Timer;