import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${fadeOut} 0.2s forwards;
  `}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.modalBackground};
  box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 24px;
  animation: ${scaleIn} 0.3s;

  > h1 {
    font-size: 22px;
    color: ${({ theme, $danger }) => (
    $danger ? theme.colors.dangerText : theme.colors.primaryText
  )};
  }

  .modal-body {
    margin-top: 32px;
  }

  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${scaleOut} 0.2s forwards;
  `}
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.secondaryText};

    &:disabled {
      cursor: default;
    }
  }
`;
