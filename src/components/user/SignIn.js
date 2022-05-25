import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Checkbox, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  modalLoginVisibleState,
  modalRegistVisibleState,
} from 'src/store/states'

const SignIn = ({ setUserData }) => {
  const [isModalRegistVisible, setIsModalRegistVisible] = useRecoilState(
    modalRegistVisibleState,
  )

  const [_, setIsModalLoginVisible] = useRecoilState(modalLoginVisibleState)

  const onRegister = () => {
    setIsModalLoginVisible(false)
    setIsModalRegistVisible(true)
  }
  const [id, setId] = useState()
  const [pw, setPw] = useState()

  useEffect(() => {
    setUserData({ id: id, pw: pw })
  }, [id, pw])
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={(e) => setId(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <a href="#" onClick={onRegister}>
          register now!
        </a>
      </Form.Item>
    </Form>
  )
}

export default SignIn
