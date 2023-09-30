import { Container } from './styles';
import useToastContainer from './useToastContainer';

import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const { renderList, handleRemoveItem } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
          onRemoveMessage={handleRemoveItem}
        />
      ))}
    </Container>
  );
}
