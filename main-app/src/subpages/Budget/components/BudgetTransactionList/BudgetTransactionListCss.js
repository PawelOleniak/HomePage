import styled from "styled-components";


export const List=styled.ul`
    >li + li{
        margin-top: ${({ theme })=>  theme.spacing.sm}px;
    }


`;
export const ListItem= styled.li`
    border: 1px solid ${({ theme })=> theme.colors.gray.dark};
    padding: ${({ theme })=>  theme.spacing.sm}px;
    display: flex;
    justify-content: space-between;
    > *:nth-child(1){
        flex: 8;
    }
    > *:nth-child(2){
        flex: 4;
    }
    > *:nth-child(3){
        flex: 6;
    }
    > *:nth-child(4){
        flex: 3;
    }
`;