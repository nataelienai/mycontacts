import { Container, Footer, Overlay } from './styles';

import Button from '../Button';

export default function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>Título do Modal</h1>
        <p>Corpo da Modal</p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button">Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}
