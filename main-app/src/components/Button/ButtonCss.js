import styled from 'styled-components';

export const RootButton = styled.button`
  color: ${({ theme: { colors }, primary }) =>
    primary ? colors.react_default.logo : colors.pink.normal};
  cursor: inherit;
  border: none;
  background-color: ${(props) =>
    props.to || props.onClick || props.type === 'submit'
      ? 'pointer'
      : 'default'};
  &:hover {
    opacity: 0.8;
  }
`;
export const InlineButton = styled(RootButton)`
  &:hover {
    text-decoration: underline;
  }
`;
export const RegularButton = styled(RootButton)`
  background: ${({ theme, primary }) =>
    primary ? theme.colors.react_default.background : theme.colors.gray.light};
  margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
  padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
  border: ${({ theme }) => `2px solid ${theme.colors.react_default.logo}`};
  border-radius: 4px;
  box-shadow: 1px 1px 5px 1px darkgray;
`;
