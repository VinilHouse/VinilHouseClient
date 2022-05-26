import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Checkbox, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  modalLoginVisibleState,
  modalRegistVisibleState,
} from 'src/store/states'
import styled from '@emotion/styled'

const SignIn = ({ setUserData }) => {
  // eslint-disable-next-line no-unused-vars
  const [isModalRegistVisible, setIsModalRegistVisible] = useRecoilState(
    modalRegistVisibleState,
  )

  // eslint-disable-next-line no-unused-vars
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
          placeholder="아이디"
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
        <StyledWrapper>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPw(e.target.value)}
          />
        </StyledWrapper>
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>아이디 기억하기</Checkbox>
        </Form.Item>
        <br />
        <a className="login-form-forgot" href="">
          비밀번호 찾기
        </a>
      </Form.Item>
      <Form.Item>
        <a href="#" onClick={onRegister}>
          아이디가 없으시다면, 회원가입 해봐요!
        </a>
      </Form.Item>
    </Form>
  )
}

export default SignIn

const StyledWrapper = styled.div`
  * {
    font-family: 'Spoqa han Sans Neo', sans-serif !important;
  }
`
