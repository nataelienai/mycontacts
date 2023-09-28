import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import useToastMessage from './useToastMessage';

export default function ToastMessage({ message, onRemoveMessage }) {
  const { handleRemoveToast } = useToastMessage({ message, onRemoveMessage });

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircle} alt="X circle" />}
      {message.type === 'success' && <img src={checkCircle} alt="Check circle" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
