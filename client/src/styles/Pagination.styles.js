import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export const PaginationButton = styled.button`
  background-color: #fff;
  border: 1px solid #90a043;
  color: #90a043;
  padding: 8px 16px;
  margin: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #f5f7f0;
  }

  svg {
    margin: 0 5px;
  }
`;

export const PageInfo = styled.span`
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: #333;
`;