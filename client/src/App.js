import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ToDoItemsTable from './components/ToDoItemsTable';
import CreateToDoItemForm from './components/CreateToDoItemForm';

const AppContainer = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 90%;
`;

const App = () => {
  const [activeItem, setActiveItem] = useState('list');

  const handleItemSelect = (item) => {
    setActiveItem(item);
  };

  const handleItemCreated = () => {
    setActiveItem('list');
  };

  return (
    <AppContainer>
      <Sidebar activeItem={activeItem} onItemSelect={handleItemSelect} />
      <ContentArea>
        <ContentWrapper>
          {activeItem === 'list' && <ToDoItemsTable />}
          {activeItem === 'create' && <CreateToDoItemForm onItemCreated={handleItemCreated} />}
        </ContentWrapper>
      </ContentArea>
    </AppContainer>
  );
};

export default App;
