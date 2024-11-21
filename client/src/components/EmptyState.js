import React from 'react';
import { EmptyStateContainer, Icon, Message } from '../styles/EmptyState.styles';

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
