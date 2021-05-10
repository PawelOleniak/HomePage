import  styled, {keyframes}  from "styled-components";

const hourglass=keyframes`
0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`

const Root = styled.div`

  position: absolute;
  width: 150px;
  height: 150px;
  margin: 40vh 0 0 40vw;
`
const Content = styled.div`
 content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;

  box-sizing: border-box;
  border: 72px solid ${({theme}) => theme.colors.ReactDefault};
  border-color: ${({theme}) => theme.colors.ReactDefault}
                transparent
                ${({theme}) => theme.colors.ReactDefault}
                transparent;
  animation: ${hourglass} 1.2s infinite;


`


function LoadingIndicator(){
    return(
        <Root>
            <Content/>


        </Root>

    )



}



export default LoadingIndicator