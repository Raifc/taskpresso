import styled from 'styled-components';

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

export const ModalBody = styled.div`
  padding: 24px;
  color: #333;
  line-height: 1.6;
`;
