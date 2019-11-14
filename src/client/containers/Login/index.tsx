import * as React from 'react';
import { Button, Form } from "antd";
import { RouteComponentProps } from 'react-router';
import MyForm from '../../components/FormGroup'
import LoginSchema from '../../formschema/LoginSchema'
import {requestAddUser} from '../../utils/userRequest';
import { AppContext } from '../../context/appContext';
import './style.less';


const { useContext } = React;

const LoginForm: React.FunctionComponent<RouteComponentProps> = ({history}) => {
  let formRef: any
  const onHandleChange = (val: any, name: string) => {
    console.log(val)
  }
  const appState = useContext(AppContext);

  const onHandleSubmit = (data: any) => {
    requestAddUser(data.name,data.password,(user: nFang.IuserItem):void => {
      console.log('success:', user)
      if(user.message == "用户已存在"){
        history.push('/home')
      }
      appState.changeUserName(data.name)
    })
  }
  const onFormClick =(e) => {
    e.preventDefault()
    formRef.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formRef.onHandleSubmit(values)
      }
    })
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
