import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background-color: #709331;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  font-family: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #393f1b;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h2`
  color: #709331;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;