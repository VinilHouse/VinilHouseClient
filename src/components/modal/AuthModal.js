import styled from '@emotion/styled'
import LoginModal from './LoginModal'
import RegistModal from './RegistModal'

const AuthModal = () => {
  return (
    <>
      <StyledWrapper>
        <LoginModal></LoginModal>
        <RegistModal></RegistModal>
      </StyledWrapper>
    </>
  )
}

export default AuthModal

const StyledWrapper = styled.div`
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
    float: left;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
`
