import  styled  from "styled-components";
import { Wrapper }       from "components/Wrapper";

export const Header=styled.header`
    background-color: ${({ theme }) => theme.colors.gray.light};
    display: flex;
    padding: ${({theme}) => theme.spacing.med}px 0;
    justify-content: space-between;
`

export const List = styled.ul`
    display: flex;
`;
export const NavigationWrapper = styled(Wrapper)`
   display: flex;
   justify-content: space-between;
`;