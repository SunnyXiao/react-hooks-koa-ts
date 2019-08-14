import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'

const LoginForm: React.FunctionComponent<RouteComponentProps> = () => {
  return (<div className='login-box'>Login form</div>)
};


export default LoginForm;
