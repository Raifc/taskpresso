import React from 'react';
import { FilterContainer, FilterLabel, Select, SelectWrapper, DropdownIcon } from '../styles/Filter.styles';

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
