import React from 'react';
import styled from 'styled-components';
import { FiPlus, FiList } from 'react-icons/fi';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2a2a2a;
  color: #fff;
  min-height: 100vh;
`;

const NavItem = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${(props) => (props.active ? '#000' : '#fff')};
  background-color: ${(props) => (props.active ? '#90a043' : 'transparent')};

  &:hover {
    background-color: #6d6d6d;
    color: #fff;
  }

  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = ({ activeItem, onItemSelect }) => {
  return (
    <SidebarContainer>
      <NavItem active={activeItem === 'create'} onClick={() => onItemSelect('create')}>
        <FiPlus size={20} />
        Create To-Do Item
      </NavItem>
      <NavItem active={activeItem === 'list'} onClick={() => onItemSelect('list')}>
        <FiList size={20} />
        To-Do Items
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
