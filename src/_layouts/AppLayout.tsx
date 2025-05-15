"use client";
import { ReactNode, useState } from "react";
import Sidebar from "@/component/Sidebar";
import { Navbar } from "@/_layouts/Navbar";
import { Layout } from "antd";

const { Header, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      {/* Navbar */}
      <Header style={{ padding: "0 16px", background: "white", display: "flex", alignItems: "center" }}>
        <Navbar />
      </Header>

      {/* Content */}
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: "white",
        }}
      >
        {children}
      </Content>

      {/* Sidebar (Right) */}
      {!collapsed && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}

      {/* Toggle Button */}
      <button
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1000,
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "☰" : "×"}
      </button>
    </Layout>
  );
}
