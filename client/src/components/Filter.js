import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Filter = ({ value, onChange }) => (
  <FilterContainer>
    <FilterLabel>Filter by status:</FilterLabel>
    <Select value={value} onChange={onChange}>
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="complete">Complete</option>
    </Select>
  </FilterContainer>
);

export default Filter;
