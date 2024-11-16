import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTrash, FiCheckCircle, FiEdit, FiEye } from 'react-icons/fi';
import ViewToDoItemModal from './Modals/ViewToDoItemModal';
import EditToDoItemModal from './Modals/EditToDoItemModal';
import axios from 'axios';

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

const ActionIcon = styled.span`
  margin-right: 10px;
  cursor: pointer;
  color: #000;

  &:hover {
    color: #28a745;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ToDoItemsTable = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchToDoItems = async () => {
    try {
      let url = '/api/v1/to_do_items';
      if (filterStatus !== 'all') {
        url = `/to_do_items/filter_by_status?status=${filterStatus}`;
      }
      const response = await axios.get(url);
      setToDoItems(response.data);
    } catch (error) {
      console.error('Error fetching to-do items:', error);
    }
  };

  useEffect(() => {
    fetchToDoItems();
  }, [filterStatus]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this to-do item?')) {
      try {
        await axios.delete(`api/v1/to_do_items/${id}`);
        fetchToDoItems();
      } catch (error) {
        console.error('Error deleting to-do item:', error);
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`api/v1/to_do_items/${id}/complete`);
      fetchToDoItems();
    } catch (error) {
      console.error('Error completing to-do item:', error);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleView = (item) => {
    setCurrentItem(item);
    setIsViewModalOpen(true);
  };


  return (
    <div>
      <FilterContainer>
        <label>
          Filter by status:{' '}
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </label>
      </FilterContainer>
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
                <ActionIcon onClick={() => { handleView(item) }}>
                  <FiEye size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => { handleEdit(item) }}>
                  <FiEdit size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => { handleComplete(item.id) }}>
                  <FiCheckCircle size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => { handleDelete(item.id) }}>
                  <FiTrash size={20} />
                </ActionIcon>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

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
          refreshToDoItems={fetchToDoItems}
        />
      )}
    </div>
  );
};

export default ToDoItemsTable;
