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
  justify-content: flex-end;
  font-size: ${({ isPhone }) => (isPhone ? '11px' : '16px')};
  transition: 0.3s ease;
  > * {
    border: 1px solid ${({ vertical, theme }) => (vertical ? theme.colors.gray.dark : 'none')};
    padding: ${({ vertical }) => (vertical ? '15px' : '10px')};
  }
  .description {
    flex: 8;
  }
  .amount {
    flex: 4;
  }
  .date {
    flex: 6;
  }
  .category {
    flex: 3;
  }
  .delete {
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
  .edit {
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
