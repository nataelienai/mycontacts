import { useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import ContactService from '../../services/ContactService';

import toast from '../../utils/toast';

export default function useEditContact() {
  const [contactName, setContactName] = useSafeAsyncState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactService.getContactById(id);

        contactFormRef.current?.setFieldValues(contact);
        setContactName(contact.name);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
        history.push('/');
      }
    }

    loadContact();
  }, [id, history, setContactName, setIsLoading]);

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
