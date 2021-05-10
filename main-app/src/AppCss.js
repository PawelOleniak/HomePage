import { createGlobalStyle } from "styled-components";
import { normalize }         from "styled-normalize";
import "App.css"

export default createGlobalStyle`
${normalize}

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
