import React, { useState } from 'react';
import { FiTrash, FiCheckCircle, FiEdit, FiEye, FiStar } from 'react-icons/fi';
import ViewToDoItemModal from './Modals/ViewToDoItemModal';
import EditToDoItemModal from './Modals/EditToDoItemModal';
import Filter from './Filter';
import EmptyState from './EmptyState';
import { useToDoItems } from '../hooks/useToDoItems';
import { TitleWrapper, Title, Header, SectionHeader } from '../shared/StyledComponents';
import LoadingOverlay from './LoadingOverlay';
import { Container, FilterContainer, Table, TitleTh, Tr, Td, Th, TitleTd, ActionContainer, ActionButton, DeleteButton, CompleteButton } from '../shared/StyledComponents';

const ToDoItemsTable = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { toDoItems, loadToDoItems, deleteItem, completeItem, loading, error } = useToDoItems(filterStatus);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleView = (item) => {
    setCurrentItem(item);
    setIsViewModalOpen(true);
  };

  const pendingItems = toDoItems.filter((item) => item.status === 'pending');
  const completedItems = toDoItems.filter((item) => item.status === 'complete');

  return (
    <Container>
      <LoadingOverlay loading={loading} />
      <Header>
        <TitleWrapper>
          <Title>To-Do Items</Title>
        </TitleWrapper>
        <FilterContainer>
          <Filter value={filterStatus} onChange={handleFilterChange} />
        </FilterContainer>
      </Header>

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching to-do items</p>}

      {toDoItems.length === 0 && !loading ? (
        <EmptyState filterStatus={filterStatus} />
      ) : (
        <>
          {(filterStatus === 'all' || filterStatus === 'pending') && (
            <>
              <SectionHeader>Pending Items</SectionHeader>
              {pendingItems.length > 0 ? (
                <Table>
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
                            <ActionButton onClick={() => handleView(item)}>
                              <FiEye />
                            </ActionButton>
                            <ActionButton onClick={() => handleEdit(item)}>
                              <FiEdit />
                            </ActionButton>
                            <DeleteButton onClick={() => deleteItem(item.id)}>
                              <FiTrash />
                            </DeleteButton>
                            <CompleteButton onClick={() => completeItem(item.id)}>
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
              <Table>
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
                          <ActionButton onClick={() => handleView(item)}>
                            <FiEye />
                          </ActionButton>
                          <ActionButton onClick={() => handleEdit(item)}>
                            <FiEdit />
                          </ActionButton>
                          <DeleteButton onClick={() => deleteItem(item.id)}>
                            <FiTrash />
                          </DeleteButton>
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
          refreshToDoItems={loadToDoItems}
        />
      )}
    </Container>
  );
};

export default ToDoItemsTable;
