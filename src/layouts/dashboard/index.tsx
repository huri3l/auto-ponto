import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'

import useAuth from '../../hooks/useAuth'

const { Header, Sider, Content } = Layout

export default function DashboardLayout({ children }) {
  const { signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout className="dashboard-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']}>
          <Menu.Item key="user" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          {React.createElement(LogoutOutlined, {
            className: 'trigger',
            title: 'Sair',
            onClick: () => signOut()
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
