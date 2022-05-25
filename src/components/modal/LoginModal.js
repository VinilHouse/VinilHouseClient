import React, { useState } from 'react'
import http from 'src/api/http.js'
import { Form, Input, Modal, Checkbox } from 'antd'
import { useRecoilState } from 'recoil'
import { modalLoginVisibleState } from 'src/store/states'
import { modalRegistVisibleState } from 'src/store/states'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginModal = () => {
  const [isModalLoginVisible, setIsModalLoginVisible] = useRecoilState(
    modalLoginVisibleState,
  )
  const [isModalRegistVisible, setIsModalRegistVisible] = useRecoilState(
    modalRegistVisibleState,
  )
  const [id, setId] = useState(0)
  const [pw, setPw] = useState(0)

  const handleOk = () => {
    console.log('ok')
    http
      .post(
        '/members/login',
        {
          ident: id,
          password: pw,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status == 200) {
          alert(`${id} 님 로그인 되었습니다!`)
          setIsModalLoginVisible(false)
        } else {
          alert('로그인에 실패했습니다!')
        }
        console.log(res)
      })
      .catch((err) => {
        alert('로그인에 실패했습니다!')
      })
  }

  const handleCancel = () => {
    console.log('cancel')
    setIsModalLoginVisible(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onRegister = () => {
    console.log('register')
    setIsModalLoginVisible(false)
    setIsModalRegistVisible(true)
  }

  return (
    <Modal
      title="Login"
      visible={isModalLoginVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
    </Modal>
  )
}

export default LoginModal
