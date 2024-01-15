import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.secondaryText};
    text-align: center;
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.strongText};
    }
  }
`;
