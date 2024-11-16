import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTrash, FiCheckCircle, FiEdit, FiEye } from 'react-icons/fi';
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
                <ActionIcon onClick={() => {}}>
                  <FiEye size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => {}}>
                  <FiEdit size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => {}}>
                  <FiCheckCircle size={20} />
                </ActionIcon>
                <ActionIcon onClick={() => {}}>
                  <FiTrash size={20} />
                </ActionIcon>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ToDoItemsTable;
