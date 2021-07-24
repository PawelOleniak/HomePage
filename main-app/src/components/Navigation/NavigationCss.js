import styled from 'styled-components';
import { Wrapper } from 'components/Wrapper';
export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.gray.light};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.med}px 0;
  justify-content: center;
  box-shadow: 0px 0px 12px 4px darkgray;

  * {
    font-size: ${({ isTabletOrMobile, isPhone }) =>
      isTabletOrMobile && isPhone ? '9px' : isTabletOrMobile ? '12px' : '16px'};
    transition: 0.3s ease;
  }
  width: 100vw;
  z-index: 8;
`;

export const List = styled.ul`
  display: flex;
`;
export const NavigationWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`;

export const NavLi = styled.li`
  margin: ${({ isTabletOrMobile, isPhone }) =>
    isTabletOrMobile && isPhone ? '0 0 0 8px' : isTabletOrMobile ? '0 0 0 16px' : '0 16px'};

  z-index: 10;
`;
