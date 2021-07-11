import styled from 'styled-components';
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  * {
    :focus {
      outline: none;
      background-color: ivory;
    }
    :nth-child(2) {
      padding: 6px 7px;
      border: 1px solid ${({ theme }) => theme.colors.gray.light};
      box-sizing: border-box;
      box-shadow: -2px 4px 8px rgba(110, 120, 140, 0.1);
      border-radius: 25px;
      width: 250px;
    }
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
