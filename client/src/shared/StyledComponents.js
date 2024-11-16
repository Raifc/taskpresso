import styled from 'styled-components';

export const ModalHeader = styled.div`
  background-color: #90a043;
  padding: 16px;
  color: #fff;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #90a043;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #393f1b;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const Label = styled.label`
  display: block;
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
`;

export const TextArea = styled.textarea`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const Select = styled.select`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Description = styled.p`
  margin-top: 10px;
`;

export const Status = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;
