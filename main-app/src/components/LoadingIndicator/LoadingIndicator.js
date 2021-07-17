import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
const Root = styled.div`
  position: absolute;
  width: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '10px' : '2vw')};
  height: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '10px' : '2vh')};
  margin: ${({ isCentered }) => (isCentered ? '40vh 45vw' : '30px')};
`;
const Content = styled.div`
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;

  box-sizing: border-box;
  border: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '40px' : '10vh')} solid;
  border-color: ${({ theme }) => theme.colors.react_default.logo} transparent
    ${({ theme }) => theme.colors.react_default.logo} transparent;
  animation: hourglass 1.2s infinite;

  @keyframes hourglass {
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
  }
`;

function LoadingIndicator({ isCentered }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 850 });
  return (
    <Root isCentered={isCentered}>
      <Content isTabletOrMobile={isTabletOrMobile} />
    </Root>
  );
}

export default LoadingIndicator;
