import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  width: 90%;
  max-width: 600px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  input,
  textarea,
  select,
  button {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    transition: box-shadow 0.3s ease;

    &:focus {
      box-shadow: 0 0 5px rgba(144, 160, 67, 0.5);
      border-color: #90a043;
    }
  }

  textarea {
    resize: vertical;
  }

  button {
    background-color: #90a043;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #393f1b;
    }
  }
`;