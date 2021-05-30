import styled  from "styled-components";

export const Category= styled.div`
    border: 1px solid ${({ theme })=>theme.colors.gray.darker};
    padding: ${({ theme })=>theme.spacing.xl};
    display: flex;
    justify-content:space-between;
`

export const ParentCategory=styled(Category)`

background-color: ${({ theme })=>theme.colors.gray.dark};




`



export const CategoryItem= styled(Category)`
    background-color: ${({ theme })=>theme.colors.gray.light};

`
