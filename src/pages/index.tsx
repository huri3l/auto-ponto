import Head from 'next/head'
import { useEffect } from 'react'
import { Form, Input, Button, Select, Alert, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import useAuth from '../hooks/useAuth'

const cardStyle = {
  display: 'flex',
  marginTop: '140px',
  alignItems: 'center',
  flexDirection: 'column'
} as React.CSSProperties

export default function Login() {
  const { signIn, loginError } = useAuth()

  useEffect(() => {
    if (loginError) {
      message.error({
        content: 'Usuário ou senha inválidos!'
      })
    }
  }, [loginError])

  async function handleSignIn(e: any) {
    if (e.app && e.username && e.password)
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
            rules={[{ required: true, message: 'Selecione o app!' }]}
            // initialValue="kairos"
          >
            <Select
              showSearch
              placeholder="Selecione o app"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="kairos">Kairos</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Digite seu usuário!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Digite sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
