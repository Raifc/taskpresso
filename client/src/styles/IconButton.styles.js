import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 4px 8px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
`;
