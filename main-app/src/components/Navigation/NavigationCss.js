import styled from 'styled-components';
import { Wrapper } from 'components/Wrapper';
export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  padding: ${({ theme }) => theme.spacing.med}px 0;
  justify-content: space-between;
  box-shadow: 0px 0px 12px 4px darkgray;
  * {
    font-size: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '11px' : '16px')};
    transition: 0.3s ease;
  }
  > :nth-child(2) {
    * {
      position: 0 absolute;
      left: calc(50% - 6vw);
    }
    position: absolute;
    left: 50%;
  }
`;

export const List = styled.ul`
  display: flex;
`;
export const NavigationWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`;

export const NavLi = styled.li`
  margin: ${({ isTabletOrMobile }) => (isTabletOrMobile ? '0 0px 0 16px' : '0 16px')};
  z-index: 10;
`;
