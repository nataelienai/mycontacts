import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  color: ${({ theme }) => theme.colors.primaryText};
  background: ${({ theme }) => theme.colors.formInputBackground};
  border: 2px solid ${({ theme }) => theme.colors.formInputBorder};
  box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.04);
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.formInputBorderFocus};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.formInputBackgroundDisabled};
    border-color: ${({ theme }) => theme.colors.formInputBorderDisabled};
    opacity: 1;
  }
`;
