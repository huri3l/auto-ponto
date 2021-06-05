import Head from 'next/head'
import { Form, Input, Button, Select, Alert, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'

const cardStyle = {
  display: 'flex',
  marginTop: '140px',
  alignItems: 'center',
  flexDirection: 'column'
} as React.CSSProperties

export default function Login() {
  const { signIn, loginError } = useAuth()

  useEffect(()=>{
    if(loginError){

        notification.error({
          message: 'Login incorreto',
          description:
            'Usuário ou senha incorreta.'
        });

    }
  },[loginError])

  async function handleSignIn(e) {
    await signIn({ app: e.app, username: e.username, password: e.password })
  }

  return (
    <div>
      <Head>
        <title>Login - Auto Ponto</title>
      </Head>

      <div style={cardStyle}>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSignIn}
        >
          <Form.Item
            name="app"
            //label="Aplicação"
            initialValue="kairos"
          >
            <Select>
              <Select.Option value="kairos">Kairos</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          {loginError &&
            <Alert
              message="Login incorreto"
              description='Usuário ou senha incorreta.'
              type="error"
              showIcon
            />
          }
        </Form>
      </div>
    </div>
  )
}
