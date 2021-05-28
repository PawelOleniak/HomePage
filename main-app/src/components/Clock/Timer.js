import React, { useState, useEffect }  from "react";
import styled from "styled-components"

function Timer(){
    const time = Time(new Date());
    return(
        <TimerText >{time.toLocaleTimeString().substring(0,5)}</TimerText>
    )
}
const TimerText=styled.h2`
position:fixed;
z-index:15;
margin-top:calc(32px + 1.1vw);
font-size:calc(0.8vw + 10px);
background: transparent;
font-family: "arial";
left: calc(49vw - 30px);
`

const Time = (current) => {
    const [date, setDate] = useState(current);

    useEffect(() => {
      let timer = setInterval( () => tick(), 10000 );
      return function clear() {
          clearInterval(timer);
        };
     },[]);

    function tick() {
      setDate(new Date());
     }

    return date;
}

export default Timer;