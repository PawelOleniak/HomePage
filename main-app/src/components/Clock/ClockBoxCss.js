import styled from 'styled-components';

export const Clock = styled.section`
  box-shadow: 3px 1px 12px 1px lightgray;
  content: '';

  position: fixed;
  top: ${({ isTabletOrMobile }) => (isTabletOrMobile ? 'calc(-4vw - 2px)' : 'calc(-4vw + 5px)')};

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
    top: calc(-21.7px);
    left: calc(-21.7px);
    width: 4.5vw;
    height: 4.5vw;
    border: calc(0.9vw + 20px) solid;
    border-color: transparent ${({ theme }) => theme.colors.gray.dark} ${({ theme }) => theme.colors.gray.dark}
      transparent;
    border-radius: 40%;
  }
`;

export const IMG = styled.section`
  box-shadow: 23px 25px 60px 30px ${({ isDay }) => (isDay ? 'orange' : 'blue')};
  top: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '22px' : '33px')};
  .icon {
    position: absolute;
    left: calc(38px - 3.8vw);
    width: calc(8px + ${({ isDay }) => (isDay ? '3.2vw' : '3.2vw')});
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
