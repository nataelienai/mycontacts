import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.04);
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabledButtonBackground} !important;
    cursor: default !important;
  }

  ${({ theme, $danger }) => $danger && css`
    background: ${theme.colors.dangerButtonBackground};

    &:hover {
      background: ${theme.colors.dangerButtonBackgroundHover};
    }

    &:active {
      background: ${theme.colors.dangerButtonBackgroundActive};
    }
  `}
`;
