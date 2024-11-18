import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoItemsTable from './components/ToDoItemsTable';
import CreateToDoItemForm from './components/CreateToDoItemForm';
import { AppContainer, ContentArea, ContentWrapper } from './shared/StyledComponents';

const App = () => {
  const [activeItem, setActiveItem] = useState('list');
  const [refetchToDoItems, setRefetchToDoItems] = useState(null);

  const handleItemSelect = (item) => {
    setActiveItem(item);
  };

  const handleItemCreated = () => {
    if (refetchToDoItems) refetchToDoItems();
    setActiveItem('list');
  };

  return (
    <AppContainer>
      <Sidebar activeItem={activeItem} onItemSelect={handleItemSelect} />
      <ContentArea>
        <ContentWrapper>
          {activeItem === 'list' && (
            <ToDoItemsTable setRefetchToDoItems={setRefetchToDoItems} />
          )}
          {activeItem === 'create' && <CreateToDoItemForm onItemCreated={handleItemCreated} />}
        </ContentWrapper>
      </ContentArea>
    </AppContainer>
  );
};

export default App;
