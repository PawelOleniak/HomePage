import styled from 'styled-components';

export const Parent = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
`;
export const Clock = styled.section`
  box-shadow: 3px 1px 12px 1px lightgray;

  position: fixed;
  top: calc(-3.5vw - 3px);

  width: 6vw;
  height: 6vw;
  border: calc(0.9vw + 40px) solid;
  border-color: transparent ${({ theme }) => theme.colors.gray.light} ${({ theme }) => theme.colors.gray.light}
    transparent;
  border-radius: 10px;
  transform: rotate(45deg);
  &:before {
    content: '';

    position: fixed;
    top: -21.37px;
    left: -21.37px;
    width: 4.5vw;
    height: 4.5vw;
    border: calc(0.9vw + 20px) solid;
    border-color: transparent ${({ theme }) => theme.colors.gray.dark} ${({ theme }) => theme.colors.gray.dark}
      transparent;
    border-radius: 40%;
  }
`;

export const IMG = styled.section`
  .icon {
    transform: rotate(45deg);
    position: relative;
    top: calc(20px + 2vw);
    width: calc(8px + 3.2vw);
    animation: ${({ isDay }) => (isDay ? 'spin' : 'cradle')} infinite 5s linear;
  }
  @keyframes cradle {
    from {
      transform: rotate(60deg);
    }
    50% {
      transform: rotate(-10deg);
    }
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
`;

export const Shadow = styled.div`
  box-shadow: 20px 35px 40px 20px ${({ isDay }) => (isDay ? 'orange' : 'blue')};
`;
export const TimerText = styled.h2`
  position: fixed;
  left: calc(0.5vw - 4px);
  top: calc(50px + 4vw);
  font-family: 'arial';
`;
