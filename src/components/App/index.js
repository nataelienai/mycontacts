import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { Container } from './styles';

import Header from '../Header';
import ToastContainer from '../Toast/ToastContainer';
import ThemeSwitcher from '../ThemeSwitcher';
import Router from '../../Router';

import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';

import GlobalStyles from '../../assets/styles/global';
import themes from '../../assets/styles/themes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <StyledThemeProvider theme={themes[theme] || themes.light}>
              <GlobalStyles />
              <ToastContainer />
              <ThemeSwitcher />

              <Container>
                <Header />
                <Router />
              </Container>
            </StyledThemeProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
