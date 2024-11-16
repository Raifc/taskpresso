import React, { useState } from 'react';
import styled from 'styled-components';
import { FiTrash, FiCheckCircle, FiEdit, FiEye } from 'react-icons/fi';
import ViewToDoItemModal from './Modals/ViewToDoItemModal';
import EditToDoItemModal from './Modals/EditToDoItemModal';
import IconButton from './IconButton';
import Filter from './Filter';
import EmptyState from './EmptyState';
import { useToDoItems } from '../hooks/useToDoItems';
import { TitleWrapper, Title, Header } from '../shared/StyledComponents';
import LoadingOverlay from './LoadingOverlay';

const Container = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  position: absolute;
  right: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

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
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {toDoItems.map((item) => (
              <tr key={item.id}>
                <Td>{item.title}</Td>
                <Td>{item.status}</Td>
                <Td>
                  <IconButton onClick={() => handleView(item)} icon={FiEye} title="Show item" />
                  <IconButton onClick={() => handleEdit(item)} icon={FiEdit} title="Edit item" />
                  <IconButton onClick={() => completeItem(item.id)} icon={FiCheckCircle} title="Mark as complete" />
                  <IconButton onClick={() => deleteItem(item.id)} icon={FiTrash} title="Delete item" />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
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
