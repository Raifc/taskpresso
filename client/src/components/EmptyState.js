import React from 'react';
import styled from 'styled-components';
import { FaClipboardList } from 'react-icons/fa';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 400px;
  margin: auto;
`;

const Icon = styled(FaClipboardList)`
  font-size: 3rem;
  color: #90a043;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0;
`;

const EmptyState = ({ filterStatus }) => (
  <EmptyStateContainer>
    <Icon />
    <Message>
      {filterStatus === 'all'
        ? 'Start by creating a To-Do Item.'
        : 'There are no to-do items with the selected status.'}
    </Message>
  </EmptyStateContainer>
);

export default EmptyState;
