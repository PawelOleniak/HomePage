import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
${normalize}
  body{
    background-color: ${({ theme }) => theme.colors.gray.light};
  }
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

`;
