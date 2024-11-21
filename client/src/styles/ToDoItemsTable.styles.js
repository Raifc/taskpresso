import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FilterContainer = styled.div`
  position: absolute;
  right: 0;
`;

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

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
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
