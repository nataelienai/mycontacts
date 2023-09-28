import useHome from './useHome';

import Loader from '../../components/Loader';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactList from './components/ContactList';

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

  return (
    <div>
      <Loader isLoading={isLoading} />

      {!hasError && contacts.length > 0 && (
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

      {hasError && (
        <ErrorStatus onTryAgain={handleTryAgain} />
      )}

      {!hasError && (
        <>
          {(contacts.length === 0 && !isLoading) && (
            <EmptyList />
          )}

          {(contacts.length > 0 && filteredContacts.length === 0 && !isLoading) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />
        </>
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
