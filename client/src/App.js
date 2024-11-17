import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoItemsTable from './components/ToDoItemsTable';
import CreateToDoItemForm from './components/CreateToDoItemForm';
import { AppContainer, ContentArea, ContentWrapper } from './shared/StyledComponents';

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
