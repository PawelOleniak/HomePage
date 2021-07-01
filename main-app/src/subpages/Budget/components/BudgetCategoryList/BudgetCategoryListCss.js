import styled  from "styled-components";

export const Category= styled.div`
    border: 1px solid ${({ theme })=>theme.colors.gray.darker};
    padding: ${({ theme })=>theme.spacing.sm}px;
    display: flex;
    justify-content:space-between;
    border-radius: 3px;
`

export const ParentCategory=styled(Category)`

background-color: ${({ theme })=>theme.colors.gray.dark};




`
export const CategoryItem= styled(Category)`
    background-color: ${({ theme })=>theme.colors.gray.light};

`
export const CategoryAmount= styled.span`
font-weight: 700;
color: ${({ theme, negative })=> negative ? theme.colors.red.normal : theme.colors.green.normal};
`
