import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ToDoItemsTable from './components/ToDoItemsTable';

const AppContainer = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const App = () => {
  const [activeItem, setActiveItem] = useState('list');

  const handleItemSelect = (item) => {
    setActiveItem(item);
  };

  return (
    <AppContainer>
      <Sidebar activeItem={activeItem} onItemSelect={handleItemSelect} />
      <ContentArea>
        {activeItem === 'list' && <ToDoItemsTable />}
        {activeItem === 'create' && <p>create to do item</p>}
      </ContentArea>
    </AppContainer>
  );
};

export default App;
