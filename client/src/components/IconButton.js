import React from 'react';
import { Button, Tooltip } from '../styles/IconButton.styles';

const IconButton = ({ onClick, icon: Icon, title }) => (
  <Button onClick={onClick}>
    <Icon />
    <Tooltip className="tooltip">{title}</Tooltip>
  </Button>
);

export default IconButton;