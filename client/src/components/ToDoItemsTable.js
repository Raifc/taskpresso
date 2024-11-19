import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FiTrash, FiCheckCircle, FiEdit, FiEye, FiStar } from 'react-icons/fi';
import ViewToDoItemModal from './Modals/ViewToDoItemModal';
import EditToDoItemModal from './Modals/EditToDoItemModal';
import Filter from './Filter';
import EmptyState from './EmptyState';
import { TitleWrapper, Title, Header, SectionHeader } from '../shared/StyledComponents';
import LoadingOverlay from './LoadingOverlay';
import { Container, FilterContainer, Table, TitleTh, Tr, Td, Th, TitleTd, ActionContainer, ActionButton, DeleteButton, CompleteButton } from '../shared/StyledComponents';
import { GET_TO_DO_ITEMS } from '../graphql/queries';
import { DELETE_TO_DO_ITEM, COMPLETE_TO_DO_ITEM } from '../graphql/mutations';

const ToDoItemsTable = ({ setRefetchToDoItems }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_TO_DO_ITEMS, {
    variables: { status: filterStatus === 'all' ? null : filterStatus },
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
    refetch();
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

  if (loading) return <LoadingOverlay loading={true} />;
  if (error) return <p>Error fetching to-do items</p>;

  const pendingItems = data?.filterToDoItemsByStatus.filter((item) => item.status === 'pending') || [];
  const completedItems = data?.filterToDoItemsByStatus.filter((item) => item.status === 'complete') || [];

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

      {data.filterToDoItemsByStatus.length === 0 && !loading ? (
        <EmptyState filterStatus={filterStatus} />
      ) : (
        <>
          {(filterStatus === 'all' || filterStatus === 'pending') && (
            <>
              <SectionHeader>Pending Items</SectionHeader>
              {pendingItems.length > 0 ? (
                <Table id="pending-items-table">
                  <thead>
                    <tr>
                      <TitleTh>Title</TitleTh>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingItems.map((item) => (
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
                            <CompleteButton onClick={() => handleComplete(item.id)} id="complete-button">
                              <FiCheckCircle /> Complete
                            </CompleteButton>
                          </ActionContainer>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#90a043' }}>
                  <FiStar size={48} />
                  <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>All Done! Congratulations!</p>
                </div>
              )}
            </>
          )}

          {completedItems.length > 0 && (
            <>
              <SectionHeader>Completed Items</SectionHeader>
              <Table id="completed-items-table">
                <thead>
                  <tr>
                    <TitleTh>Title</TitleTh>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {completedItems.map((item) => (
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
                          <CompleteButton onClick={() => handleComplete(item.id)} id="complete-button">
                            <FiCheckCircle /> Complete
                          </CompleteButton>
                        </ActionContainer>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
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
