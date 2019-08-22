import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'

const LoginForm: React.FunctionComponent<RouteComponentProps> = () => {
  const handleChange = (val: any) => {
    console.log(val)
  }
  return (
  <div className='login-box'>Login form
    <MyForm schema={LoginSchema} onChange={handleChange}></MyForm>
  </div>
  )
};


export default LoginForm;
