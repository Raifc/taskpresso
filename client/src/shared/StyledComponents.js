import styled from 'styled-components';

//
// Buttons
//
export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  transition: color 0.2s ease-in;

  &:hover {
    color: #ff4b4b;
  }
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

export const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: #aeaeae;

  &:hover {
    background-color: #2a2a2a;
  }
`;

export const CompleteButton = styled(ActionButton)`
  background-color: #3e6896;

  &:hover {
    background-color: #243d59;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #FF6961;

  &:hover {
    background-color: #991b1b;
  }
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9em;
  margin-left: 5px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

//
// Form Elements
//
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

export const Select = styled.select`
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
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

//
// Headers and Titles
//
export const ModalHeader = styled.div`
  background: linear-gradient(135deg, #90a043, #709331);
  padding: 20px;
  color: #fff;
  font-size: 1.1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

//
// Modal Body
//
export const ModalBody = styled.div`
  padding: 24px;
  color: #333;
  line-height: 1.6;
`;

//
// Wrappers and Containers
//
export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const AppContainer = styled.div`
  display: flex;
`;

export const ContentArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 90%;
`;

export const FilterContainer = styled.div`
  position: absolute;
  right: 0;
`;

//
// Table Elements
//
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #F5F5DC;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const Th = styled.th`
  text-align: center;
  padding: 12px;
  background-color: #90a043;
  color: white;
  width: 33.33%;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

export const TitleTh = styled(Th)`
  text-align: left;
  padding-left: 40px;
`;

export const TitleTd = styled.td`
  text-align: left;
  padding-left: 40px;
  border-bottom: 1px solid #ddd;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

//
// Text Elements
//
export const Description = styled.p`
  margin-top: 10px;
`;

export const Status = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

export const ItemDetails = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const DetailRow = styled.div`
  justify-content: space-between;
  text-align: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow-wrap: break-word;

  &:last-child {
    border-bottom: none;
  }
`;

export const Value = styled.div`
  max-height: 150px;
  overflow-y: auto;
  padding-right: 8px;
  margin-left: 8px;
  text-transform: capitalize;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
export const SectionHeader = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a4a4a;
  margin: 30px 0 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;