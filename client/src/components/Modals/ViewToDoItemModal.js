import React from 'react';
import BaseModal from './BaseModal';
import { ItemDetails, DetailRow, Value, Divider } from '../../styles/ViewToDoItemModal.styles';
import { Label } from '../../styles/sharedStyles';

const ViewToDoItemModal = ({ isOpen, onRequestClose, item }) => (
  <BaseModal isOpen={isOpen} onRequestClose={onRequestClose} title={item.title}>
    <ItemDetails>
      <Label>Description</Label>
      <DetailRow>
        <Value>{item.description}</Value>
      </DetailRow>
    </ItemDetails>
    <Divider />
    <ItemDetails>
      <Label>Status</Label>
      <DetailRow>
        <Value>{item.status}</Value>
      </DetailRow>
    </ItemDetails>
  </BaseModal>
);

export default ViewToDoItemModal;
