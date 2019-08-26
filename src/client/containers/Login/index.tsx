import * as React from 'react';
import { Button, Form } from "antd";
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'

const LoginForm: React.FunctionComponent<RouteComponentProps> = () => {
  let formRef: any
  const onHandleChange = (val: any, name: string) => {
    console.log(val)
  }
  const onHandleSubmit = () => {

  }
  const onFormClick =() => {
    console.log(formRef)
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
