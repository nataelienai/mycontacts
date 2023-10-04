import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function ReactPortal({
  children,
  containerId = 'portal-root',
}) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  children: PropTypes.node.isRequired,
  containerId: PropTypes.string,
};
