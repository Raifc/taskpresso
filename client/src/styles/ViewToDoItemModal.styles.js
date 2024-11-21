import styled from 'styled-components';

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

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;
