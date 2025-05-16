import { Button, Tooltip } from 'antd';
import React from 'react';

interface CartButtonProps {
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
}

export const CardButton: React.FC<CartButtonProps> = ({
  icon,
  tooltip,
  onClick
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button shape="circle" icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
