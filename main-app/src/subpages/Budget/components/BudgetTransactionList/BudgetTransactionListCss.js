import styled from 'styled-components';

export const List = styled.ul`
  > li + li {
    margin-top: ${({ theme }) => theme.spacing.sm}px;
  }
`;
export const ListItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  padding: ${({ theme }) => theme.spacing.sm}px;
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  justify-content: space-between;
  > * {
    border: 1px solid ${({ vertical, theme }) => (vertical ? theme.colors.gray.dark : 'none')};
    padding: ${({ vertical }) => (vertical ? '15px' : '10px')};
  }
  > *:nth-child(1) {
    flex: 8;
  }
  > *:nth-child(2) {
    flex: 4;
  }
  > *:nth-child(3) {
    flex: 6;
  }
  > *:nth-child(4) {
    flex: 3;
  }
  > *:nth-child(5) {
    flex: 1;

    > * {
      background-color: rgb(250, 120, 0, 0.3);
      padding: ${({ vertical }) => (vertical ? '0 20px' : '3px 6px')};
      border-radius: 20px;
      :hover {
        background-color: rgb(250, 40, 0, 0.7);
        text-decoration: none;
      }
    }
  }
  > *:nth-child(6) {
    flex: 1;
    > * {
      background-color: rgb(180, 180, 0, 0.6);
      padding: ${({ vertical }) => (vertical ? '0 20px' : '3px 6px')};
      border-radius: 20px;
      :hover {
        background-color: rgb(220, 220, 0, 0.7);
        text-decoration: none;
      }
    }
  }
`;
