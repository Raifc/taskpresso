import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: 20px auto;
`;

const FilterLabel = styled.label`
  margin-right: 15px;
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  font-family: inherit;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Select = styled.select`
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

const DropdownIcon = styled(FaChevronDown)`
  position: absolute;
  right: 12px;
  color: #333;
  pointer-events: none;
  font-size: 14px;
`;

const Filter = ({ value, onChange }) => (
  <FilterContainer>
    <FilterLabel>Filter by status:</FilterLabel>
    <SelectWrapper>
      <Select value={value} onChange={onChange} id="filter-select">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
      </Select>
      <DropdownIcon />
    </SelectWrapper>
  </FilterContainer>
);

export default Filter;
