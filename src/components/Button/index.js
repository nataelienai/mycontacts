import PropTypes from 'prop-types';

import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  children,
  onClick,
  type = '',
  disabled = false,
  isLoading = false,
  danger = false,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
};
