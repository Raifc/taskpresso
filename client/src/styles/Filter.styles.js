import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: 20px auto;
`;

export const FilterLabel = styled.label`
  margin-right: 15px;
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  font-family: inherit;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #ffffff;
  color: #333;
  appearance: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #90a043;
    outline: none;
    box-shadow: 0 0 0 2px rgba(144, 160, 67, 0.2);
  }
`;

export const DropdownIcon = styled(FaChevronDown)`
  position: absolute;
  right: 12px;
  color: #333;
  pointer-events: none;
  font-size: 14px;
`;
