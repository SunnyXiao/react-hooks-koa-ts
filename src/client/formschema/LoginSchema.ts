const LoginSchema = [
  {
    field: 'name',
    key: 'name',
    label: '用户名',
    value: '',
    type: 'text',
    placeholder: '用户名',
    class: 'form-item',
    iconType:'user',
    disabled: false,
    rules: [{
      required: true,
      message: 'Please input your name!',
    }]
  },
  {
    field: 'password',
    key: 'password',
    label: '密码',
    value: '',
    type: 'password',
    placeholder: '密码',
    disabled: false,
    class: 'form-item',
    iconType:'lock',
    rules: []
  },
  {
    field: 'pin',
    key: 'pin',
    label: 'PIN码',
    value: '',
    type: 'int',
    placeholder: 'PIN码',
    disabled: false,
    class: 'form-item',
    iconType: '',
    rules: []
  }
]


export default LoginSchema
