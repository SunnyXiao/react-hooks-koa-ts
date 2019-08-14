const LoginSchema = [
  {
    field: 'name',
    key: 'name',
    label: '用户名',
    value: '',
    type: 'text',
    inputtype: 'text',
    class: 'form-item',
    rules: []
  },
  {
    field: 'password',
    key: 'password',
    label: '密码',
    value: '',
    type: 'text',
    inputtype: 'password',
    class: 'form-item',
    rules: []
  },
  {
    field: 'pin',
    key: 'pin',
    label: 'PIN码',
    value: '',
    type: 'text',
    inputtype: 'number',
    class: 'form-item',
    rules: []
  }
]


export default LoginSchema
