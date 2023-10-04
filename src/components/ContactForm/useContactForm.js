import {
  useState, useEffect, useImperativeHandle,
} from 'react';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import CategoryService from '../../services/CategoryService';

import toast from '../../utils/toast';

export default function useContactForm({ onSubmit, ref }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useSafeAsyncState(false);

  const {
    errors,
    setError,
    unsetError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), [setName, setEmail, setPhone, setCategoryId]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      setIsLoadingCategories(true);

      try {
        const categoryList = await CategoryService.listCategories(
          controller.signal,
        );

        setCategories(categoryList);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao obter as categorias!',
        });
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      unsetError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      unsetError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }

  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isFormValid,
    isLoadingCategories,
    isSubmitting,
    getErrorMessageByFieldName,
    setCategoryId,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
  };
}
