import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import ContactService from '../../services/ContactService';

import toast from '../../utils/toast';

export default function useEditContact() {
  const [contactName, setContactName] = useSafeAsyncState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactService.getContactById(
          id,
          controller.signal,
        );

        contactFormRef.current?.setFieldValues(contact);
        setContactName(contact.name);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
        navigate('/', { replace: true });
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, setContactName, setIsLoading, navigate]);

  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactService.updateContact(id, contact);

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return {
    contactName,
    contactFormRef,
    isLoading,
    handleSubmit,
  };
}
