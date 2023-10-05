import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({
  hasError,
  numberOfcontacts,
  numberOfFilteredContacts,
}) {
  const alignment = !hasError && numberOfcontacts > 0
    ? 'space-between'
    : 'center';

  return (
    <Container $justifyContent={alignment}>
      {(!hasError && numberOfcontacts > 0) && (
        <strong>
          {numberOfFilteredContacts}
          {numberOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  numberOfcontacts: PropTypes.number.isRequired,
  numberOfFilteredContacts: PropTypes.number.isRequired,
};
