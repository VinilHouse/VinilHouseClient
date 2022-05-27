import styled from '@emotion/styled'
import { Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import http from 'src/api/http.js'
import {
  modalLoginVisibleState,
  modalRegistVisibleState,
} from 'src/store/states'

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
  // eslint-disable-next-line no-unused-vars
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

  const onLogin = () => {
    setIsModalRegistVisible(false)
    setIsModalLoginVisible(true)
  }

  const handleOk = () => {
    if (pw !== pwcf) {
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
        alert('회원가입에 성공했습니다.')
        setIsModalRegistVisible(false)
        setIsModalLoginVisible(true)
      })
      .catch((err) => {
        alert(err.response.data.content)
        console.log(err)
      })
  }

  const handleCancel = () => {
    setIsModalRegistVisible(false)
  }

  return (
    <Modal
      title="Register"
      visible={isModalRegistVisible}
      onOk={handleOk}
      okText="회원가입"
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        name="register"
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="id"
          label="아이디"
          rules={[
            {
              type: 'id',
              message: '다른 아이디를 입력해주세요!',
            },
            {
              required: true,
              message: '아이디를 입력해주세요',
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
              message: '올바른 이메일 형식이 아닙니다.',
            },
            {
              required: true,
              message: '이메일을 입력해주세요!',
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <StyledWrapper>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요',
              },
            ]}
            hasFeedback
          >
            <Input.Password onChange={(e) => setPw(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호와 일치 하지 않습니다.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error('비밀번호와 일치 하지 않습니다.'),
                  )
                },
              }),
            ]}
          >
            <Input.Password onChange={(e) => setPwcf(e.target.value)} />
          </Form.Item>
        </StyledWrapper>
        <Form.Item {...tailFormItemLayout}>
          <a href="#" onClick={onLogin}>
            로그인하기
          </a>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RegistModal
const StyledWrapper = styled.div`
  * {
    font-family: 'Spoqa han Sans Neo', sans-serif !important;
  }
`
