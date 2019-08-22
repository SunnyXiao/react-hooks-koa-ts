
import React from "react";
import { Radio, Form, Input, InputNumber,
  DatePicker, Select, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";

const FormItem = Form.Item
const { Option } = Select
// 默认的layout
export const defaultLabelColSpan = 6

const defaultFormItemLayout = {
  labelCol: { span: defaultLabelColSpan },
  wrapperCol: { span: 14 },
}

interface FormProps extends FormComponentProps {
  layout: object,
  schema: NFormItemProps[],
  hideRequiredMark: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (value: any, name: string) => void,
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
interface NFormItemProps {
  type: string,
  label: string,
  key: string,
  value: any,
  disabled: boolean,
  placeholder: string,
  rules: object | object[],
  options?: (object|number|string)[]
}

interface FormItemProps {
  item: NFormItemProps,
  layout: object,
  getFieldDecorator: any
}


const  MyForm: React.FunctionComponent<FormProps> = (props) =>{
  const {form, layout, schema, handleChange, handleSubmit} = props
  const { getFieldDecorator } = form

  {/**form item */}
  const renderFormItem:React.FC<FormItemProps> = ({item, layout, getFieldDecorator }) => {
    const { label, key, rules, value } = item
    return (
      <FormItem key={key} label={label} {...layout}>
        {
          getFieldDecorator(key, {
            validateTrigger: "onBlur",
            initialValue: value,
            rules
          })(
            switchItem(item)
          )
        }
      </FormItem>
    )
  }
  {/** input、select... */}
  const switchItem = (item: NFormItemProps): React.ReactNode => {
    const {type, options, placeholder} = item;
    switch (type) {
      case 'int':
        return <InputNumber style={{ width: '100%' }} placeholder= {placeholder}
        onChange = {value => handleChange(value, item.key)} />
      case 'text':
        return <Input placeholder= {placeholder}
        onChange = {value => handleChange(value, item.key)} />;
      case 'password':
        return <Input type='password' placeholder= {placeholder}
        onChange = {value => handleChange(value, item.key)}/>
      case 'date':
        return <DatePicker style={{ width: '100%' }} placeholder= {placeholder}
        onChange = {value => handleChange(value, item.key)} />;
      case 'select':
        return (
          <Select placeholder= {placeholder} onChange = {value => handleChange(value, item.key)}>
            {
              options && options.map((option: any, index: number) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            }
          </Select>
        )
      case 'radio':
        return (
          <Radio.Group onChange = {value => handleChange(value, item.key)}>
            {
              options && options.map((option: any, index: number) => {
                return (<Radio key={index} value={option}>{option}</Radio>)
              })
            }
          </Radio.Group>
        )
      default:
        return <Input placeholder= {placeholder}
        onChange = {value => handleChange(value, item.key)} />
    }
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // handleSubmit()
      }
    })
  }

  return (
    <Form onSubmit={onHandleSubmit}>
      {
        schema.map( item => renderFormItem({item, layout, getFieldDecorator}))
      }
      <FormItem>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
    </Form>
  )
}
MyForm.defaultProps = {
  layout: defaultFormItemLayout,
  hideRequiredMark: false,
  handleSubmit(){},
  handleChange(){},
  handleBlur(){},
  handleFocus(){}
}

export default Form.create<FormProps>()(MyForm)
