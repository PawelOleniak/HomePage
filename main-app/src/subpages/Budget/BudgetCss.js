import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  margin-top: ${({ isBigScreen }) => (isBigScreen ? 'calc(50px + 6vw)' : '135px')};
  section:nth-child(1) {
    flex: 9;
    margin-left: 4vw;
  }
  section:nth-child(2) {
    flex: 2;
  }
  section:nth-child(3) {
    flex: 17;
    margin-right: 4vw;
  }
  * {
    font-size: ${({ isTabletOrMobile, isPhone }) =>
      isTabletOrMobile && isPhone ? '9px' : isTabletOrMobile ? '12px' : '16px'};
    transition: 0.3s ease;
  }
`;
