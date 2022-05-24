import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { modalLoginVisibleState } from 'src/store/states'
import { modalRegistVisibleState } from 'src/store/states'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import http from 'src/api/http.js'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const RegistModal = () => {
  const [isModalLoginVisible, setIsModalLoginVisible] = useRecoilState(
    modalLoginVisibleState,
  )
  const [isModalRegistVisible, setIsModalRegistVisible] = useRecoilState(
    modalRegistVisibleState,
  )
  const [id, setId] = useState(0)
  const [email, setEmail] = useState(0)
  const [pw, setPw] = useState(0)
  const [pwcf, setPwcf] = useState(0)

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  const onLogin = () => {
    setIsModalRegistVisible(false)
    setIsModalLoginVisible(true)
  }

  const handleOk = () => {
    console.log('ok')
    if (pw != pwcf) {
      alert('비밀번호를 확인하세요.')
      return
    }

    http
      .post('/members', {
        ident: id,
        email: email,
        password: pw,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    alert('회원가입에 성공했습니다.')
    setIsModalRegistVisible(false)
    setIsModalLoginVisible(true)
  }

  const handleCancel = () => {
    setIsModalRegistVisible(false)
    console.log('cancel')
  }

  return (
    <Modal
      title="Register"
      visible={isModalRegistVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="id"
          label="id"
          rules={[
            {
              type: 'id',
              message: 'The input is not valid id!',
            },
            {
              required: true,
              message: 'Please input your id',
            },
          ]}
        >
          <Input onChange={(e) => setId(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={(e) => setPw(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password onChange={(e) => setPwcf(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <a href="#" onClick={onLogin}>
            login now!
          </a>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RegistModal
