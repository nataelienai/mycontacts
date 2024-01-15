import { useContext } from 'react';

import { Container } from './styles';

import { ThemeContext } from '../../contexts/ThemeContext';

import lightThemeLogo from '../../assets/images/light-theme-logo.svg';
import darkThemeLogo from '../../assets/images/dark-theme-logo.svg';

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <Container>
      {theme === 'light'
        ? <img src={lightThemeLogo} alt="logo" width="201" />
        : <img src={darkThemeLogo} alt="logo" width="201" />}
    </Container>
  );
}
