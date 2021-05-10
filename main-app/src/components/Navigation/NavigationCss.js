import  styled  from "styled-components";
import { Wrapper }       from "components/Wrapper";

export const Header=styled.header`
    background-color: ${({ theme }) => theme.colors.gray.light};
    display: flex;
    padding: ${({theme}) => theme.spacing.med}px 0;
    justify-content: space-between;

    ::after {
        content: '';
    display:block;
  position: absolute;
  top: calc(-4vw + 5px);
  left: calc(45vw - 40px);
  width: 6vw;
  height: 6vw;
  border: calc(0.9vw + 40px) solid red;
  border-color: transparent
                ${({ theme }) => theme.colors.gray.light}
                ${({ theme }) => theme.colors.gray.light}
                transparent;
  border-radius: 10px;
  transform: rotate( 45deg);
    }
    ::before {
        content: '';
    display:block;
  position: absolute;
  top: calc(-2.1vw + 26px);
  left: calc(46.8vw - 20px);
  width: 2.1vw;
  height: 2.1vw;
  border: calc(0.9vw + 20px) solid red;
  border-color: transparent
                ${({ theme }) => theme.colors.gray.dark}
                ${({ theme }) => theme.colors.gray.dark}
                transparent;
  border-radius: 4px;
  transform: rotate( 45deg);
  z-index:1;
 }

`

export const List = styled.ul`
    display: flex;
`;
export const NavigationWrapper = styled(Wrapper)`
   display: flex;
   justify-content: space-between;
`;

export const NavLi= styled.li`
    margin:0 15px;
`