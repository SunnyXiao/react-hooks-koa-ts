import * as React from 'react';
import { Button, Form } from "antd";
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'
import {requestAddUser} from '../../utils/userRequest'
import './style.less';

const LoginForm: React.FunctionComponent<RouteComponentProps> = ({history}) => {
  let formRef: any
  const onHandleChange = (val: any, name: string) => {
    console.log(val)
  }
  const onHandleSubmit = (data: any) => {
    requestAddUser(data.name,data.password,(user: nFang.IuserItem):void => {
      console.log('success:', user)
      if(user.message == "用户已存在"){
        history.push('/home')
      }
    })
  }
  const onFormClick =() => {
    formRef.onHandleSubmit()
  }
  const onFormLogin = ()=> {

  }
  return (
    <div className='login-box'>
      Login form
      <MyForm
        wrappedComponentRef={(inst: any) => formRef = inst}
        schema={LoginSchema}
        handleChange={onHandleChange}
        handleSubmit={onHandleSubmit}
      />
      <div className="login-btn-wrap">
        {/* <Button onClick={onFormClick}>
          Register
        </Button> */}
        <Button type="primary" onClick={onFormClick}>
          sign in
        </Button>
      </div>
    </div>
  )
};


export default LoginForm;
