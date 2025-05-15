"use client"
import { Menu, Layout } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

export default function Sidebar({ collapsed }: SidebarProps) {
const { Sider } = Layout;
  return (
    <Sider
      width={200}
      style={{
        position: 'fixed',
        top: 64,
        right: 0,
        height: 'calc(100vh - 64px)',
        background: '#001529',
        zIndex: 999,
      }}
    >
    </Sider>
  );
}
