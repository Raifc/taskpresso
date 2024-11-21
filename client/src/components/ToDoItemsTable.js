import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FiTrash, FiCheckCircle, FiEdit, FiEye, FiStar, } from 'react-icons/fi';
import ViewToDoItemModal from './Modals/ViewToDoItemModal';
import EditToDoItemModal from './Modals/EditToDoItemModal';
import Filter from './Filter';
import EmptyState from './EmptyState';
import LoadingOverlay from './LoadingOverlay';
import Pagination from './Pagination';
import { GET_TO_DO_ITEMS } from '../graphql/queries';
import { DELETE_TO_DO_ITEM, COMPLETE_TO_DO_ITEM } from '../graphql/mutations';
import {Container, FilterContainer, Table, Th, Td, Tr, TitleTh, TitleTd, ActionContainer, CompleteButton, DeleteButton, ActionButton } from '../styles/ToDoItemsTable.styles'
import { Header, TitleWrapper, Title } from '../styles/sharedStyles';
const ToDoItemsTable = ({ setRefetchToDoItems }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_TO_DO_ITEMS, {
    variables: {
      status: filterStatus === 'all' ? null : filterStatus,
      page: currentPage,
      perPage: perPage,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteToDoItem] = useMutation(DELETE_TO_DO_ITEM, {
    onCompleted: () => refetch(),
  });

  const [completeToDoItem] = useMutation(COMPLETE_TO_DO_ITEM, {
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    if (setRefetchToDoItems) {
      setRefetchToDoItems(() => refetch);
    }
  }, [setRefetchToDoItems, refetch]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleView = (item) => {
    setCurrentItem(item);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteToDoItem({ variables: { id } });
  };

  const handleComplete = (id) => {
    completeToDoItem({ variables: { id } });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (data?.filterToDoItemsByStatus.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <LoadingOverlay loading={true} />;
  if (error) return <p>Error fetching to-do items</p>;

  const items = data?.filterToDoItemsByStatus.toDoItems || [];
  const pagination = data?.filterToDoItemsByStatus;

  const noItems = items.length === 0 && !loading;

  const showCongratulations = filterStatus === 'pending' && noItems;

  const showEmptyState = !showCongratulations && noItems;

  const sortedItems = [...items].sort((a, b) => {
    if (a.status === 'pending' && b.status === 'complete') return -1;
    if (a.status === 'complete' && b.status === 'pending') return 1;
    return 0;
  });

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>To-Do Items</Title>
        </TitleWrapper>
        <FilterContainer>
          <Filter value={filterStatus} onChange={handleFilterChange} />
        </FilterContainer>
      </Header>

      {showCongratulations ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#90a043' }}>
          <FiStar size={48} />
          <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
            All Done! Congratulations!
          </p>
        </div>
      ) : showEmptyState ? (
        <EmptyState filterStatus={filterStatus} />
      ) : (
        <>
          <Table id="todo-items-table">
            <thead>
              <tr>
                <TitleTh>Title</TitleTh>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <Tr key={item.id}>
                  <TitleTd>{item.title}</TitleTd>
                  <Td>{item.status}</Td>
                  <Td>
                    <ActionContainer>
                      <ActionButton onClick={() => handleView(item)} id="view-button">
                        <FiEye />
                      </ActionButton>
                      <ActionButton onClick={() => handleEdit(item)} id="edit-button">
                        <FiEdit />
                      </ActionButton>
                      <DeleteButton onClick={() => handleDelete(item.id)} id="delete-button">
                        <FiTrash />
                      </DeleteButton>
                      {item.status !== 'complete' && (
                        <CompleteButton onClick={() => handleComplete(item.id)} id="complete-button">
                          <FiCheckCircle /> Complete
                        </CompleteButton>
                      )}
                    </ActionContainer>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages || 1}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />
        </>
      )}

      {isViewModalOpen && currentItem && (
        <ViewToDoItemModal
          isOpen={isViewModalOpen}
          onRequestClose={() => setIsViewModalOpen(false)}
          item={currentItem}
        />
      )}
      {isEditModalOpen && currentItem && (
        <EditToDoItemModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          item={currentItem}
          refreshToDoItems={refetch}
        />
      )}
    </Container>
  );
};

export default ToDoItemsTable;
