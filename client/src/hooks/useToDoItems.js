import { useState, useEffect } from 'react';
import { fetchToDoItems, deleteToDoItem, completeToDoItem } from '../services/toDoService';

export const useToDoItems = (filterStatus) => {
  const [toDoItems, setToDoItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadToDoItems = async () => {
    setLoading(true);
    try {
      const items = await fetchToDoItems(filterStatus);
      setToDoItems(items);
      setError(null);
    } catch (error) {
      console.error('Error loading to-do items:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteToDoItem(id);
      loadToDoItems();
    } catch (error) {
      console.error('Error deleting to-do item:', error);
      setError(error);
    }
  };

  const completeItem = async (id) => {
    try {
      await completeToDoItem(id);
      loadToDoItems();
    } catch (error) {
      console.error('Error completing to-do item:', error);
      setError(error);
    }
  };

  useEffect(() => {
    loadToDoItems();
  }, [filterStatus]);

  return { toDoItems, loadToDoItems, deleteItem, completeItem, loading, error };
};