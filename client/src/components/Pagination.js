import React from 'react';
import {
  PaginationContainer,
  PaginationButton,
  PageInfo,
} from '../shared/StyledComponents';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <PaginationContainer>
      <PaginationButton
        onClick={onPrevious}
        disabled={currentPage <= 1}
        id="previous-button"
      >
        <FiChevronLeft /> Previous
      </PaginationButton>
      <PageInfo>
        Page {currentPage} of {totalPages || 1}
      </PageInfo>
      <PaginationButton
        onClick={onNext}
        disabled={currentPage >= totalPages}
        id="next-button"
      >
        Next <FiChevronRight />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
