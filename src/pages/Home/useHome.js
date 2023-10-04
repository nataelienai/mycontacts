import {
  useCallback, useDeferredValue, useEffect, useMemo, useState,
} from 'react';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import ContactService from '../../services/ContactService';

import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useSafeAsyncState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useSafeAsyncState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useSafeAsyncState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useSafeAsyncState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    setIsLoading(true);

    try {
      const contactList = await ContactService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, setContacts, setIsLoading, setHasError]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, [setContactBeingDeleted, setIsDeleteModalVisible]);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    setIsLoadingDelete(true);

    try {
      await ContactService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato excluído com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao excluir o contato!',
      });
    }

    setIsLoadingDelete(false);
  }

  return {
    contacts,
    filteredContacts,
    contactBeingDeleted,
    searchTerm,
    orderBy,
    hasError,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  };
}
