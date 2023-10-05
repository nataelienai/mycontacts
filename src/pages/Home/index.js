import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactList from './components/ContactList';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

export default function Home() {
  const {
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
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !isLoading && !hasError && !hasContacts;
  const isSearchEmpty = hasContacts && filteredContacts.length === 0;

  return (
    <div>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        numberOfcontacts={contacts.length}
        numberOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <ContactList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToggleOrderBy={handleToggleOrderBy}
          onDeleteContact={handleDeleteContact}
        />
      )}

      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja excluir o contato ”${contactBeingDeleted?.name}”?`}
        confirmLabel="Excluir"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </div>
  );
}
