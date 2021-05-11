import styled from "styled-components";



export const Clock=styled.section`

box-shadow: 3px 1px 17px 9px lightgray;
    content: '';
    display:block;
  position: fixed;
  top: calc(-4vw + 5px);
  left: calc(45vw - 45px);
  width: 6vw;
  height: 6vw;
  border: calc(0.9vw + 40px) solid ;
  border-color: transparent
                ${({ theme }) => theme.colors.gray.light}
                ${({ theme }) => theme.colors.gray.light}
                transparent;
  border-radius: 10px;
  transform: rotate( 45deg);

    &:before {
        content: "";

  position: fixed;
  top: calc(-21.6px );
  left: calc(-21.6px );
  width: 4.5vw;
  height: 4.5vw;
  border: calc(0.9vw + 20px) solid;
  border-color: transparent
                ${({ theme }) => theme.colors.gray.dark}
                ${({ theme }) => theme.colors.gray.dark}
                transparent;
  border-radius: 40%;

 }
`




export const IMG=styled.section`
box-shadow: 23px 25px 60px 30px ${({isDay}) => isDay ? 'orange' :'blue'};
    display:block;
  position: fixed;
  top: 31px;
  left: calc(48.9vw - 30px);

img{

        width: calc(8px + ${({isDay}) => isDay ? '3.2vw' :'1.9vw'});
        position: absolute;
        top:${({isDay}) => isDay ? '5px' :'15px'};
        left:calc(22px - ${({isDay}) => isDay ? '1.7vw' :'1vw'});
        animation: ${({isDay}) => isDay ? 'spin' : 'cradle'} infinite 5s linear;
    }
    @keyframes cradle {
  from {
    transform: rotate(60deg);
  }
  50% {transform: rotate(-10deg)}
  to {
    transform: rotate(60deg);
  }
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

`

