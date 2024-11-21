import React from 'react';
import { FiPlus, FiList } from 'react-icons/fi';
import {SidebarContainer, NavItem } from '../styles/Sidebar.styles';

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
