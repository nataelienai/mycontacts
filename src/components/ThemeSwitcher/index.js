import { useContext } from 'react';

import { Container } from './styles';

import { ThemeContext } from '../../contexts/ThemeContext';

import moon from '../../assets/images/icons/moon.svg';
import sun from '../../assets/images/icons/sun.svg';

export default function ThemeSwitcher() {
  const { theme, handleToggleTheme } = useContext(ThemeContext);

  return (
    <Container
      type="button"
      onClick={handleToggleTheme}
    >
      {theme === 'light'
        ? <img src={moon} alt="Moon" />
        : <img src={sun} alt="Sun" />}
    </Container>
  );
}
