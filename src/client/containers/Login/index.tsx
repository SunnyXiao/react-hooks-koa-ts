import * as React from 'react';
import { Button, Form } from "antd";
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'
import {requestAddUser} from '../../utils/request'

const LoginForm: React.FunctionComponent<RouteComponentProps> = () => {
  let formRef: any
  const onHandleChange = (val: any, name: string) => {
    console.log(val)
  }
  const onHandleSubmit = (data: any) => {
    requestAddUser(data.name,data.password,(user: nFang.IuserItem):void => {
      console.log('success:', user)
    })
  }
  const onFormClick =() => {
    formRef.onHandleSubmit()
  }
  return (
  <div className='login-box'>Login form
    <MyForm wrappedComponentRef={(inst: any) => formRef = inst}
      schema={LoginSchema}
      handleChange={onHandleChange}
      handleSubmit={onHandleSubmit} />
    <Button type="primary" onClick={onFormClick}>
      Register
    </Button>
  </div>
  )
};


export default LoginForm;
