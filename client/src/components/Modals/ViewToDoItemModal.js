import React from 'react';
import BaseModal from './BaseModal';
import { Description, Status } from '../../shared/StyledComponents';

const ViewToDoItemModal = ({ isOpen, onRequestClose, item }) => (
  <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} title={item.title}>
    <Description>{item.description}</Description>
    <Status>Status: {item.status}</Status>
  </BaseModal>
);

export default ViewToDoItemModal;
