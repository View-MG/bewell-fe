"use client"
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button } from 'antd';

export function Trigger() {
  const [isSlide, setIsSlide] = useState(false);

  return (
    <>
      <Button
        type="text"
        icon={isSlide ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setIsSlide(true)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </>
  );
}
