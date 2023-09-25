import PropTypes from 'prop-types';

import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children, onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: '',
  disabled: false,
  isLoading: false,
  onClick: () => {},
};
