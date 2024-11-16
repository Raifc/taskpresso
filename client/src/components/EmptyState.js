import React from 'react';

const EmptyState = ({ filterStatus }) => (
  <p>
    {filterStatus === 'all'
      ? 'Start by creating a To-Do Item.'
      : 'There are no to-do items with the selected status.'}
  </p>
);

export default EmptyState;
