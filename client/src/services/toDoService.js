import axios from 'axios';

export const fetchToDoItems = async (filterStatus) => {
  try {
    let url = 'api/v1/to_do_items';
    if (filterStatus !== 'all') {
      url = `api/v1/to_do_items/filter_by_status?status=${filterStatus}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching to-do items:', error);
    throw error;
  }
};

export const deleteToDoItem = async (id) => {
  try {
    await axios.delete(`api/v1/to_do_items/${id}`);
  } catch (error) {
    console.error('Error deleting to-do item:', error);
    throw error;
  }
};

export const completeToDoItem = async (id) => {
  try {
    await axios.put(`api/v1/to_do_items/${id}/complete`);
  } catch (error) {
    console.error('Error completing to-do item:', error);
    throw error;
  }
};
