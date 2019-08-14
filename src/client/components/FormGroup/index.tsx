
import React from "react";
import { Button, Form, Input, InputNumber, DatePicker, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";

const FormItem = Form.Item
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
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
interface NFormItemProps {
  type: string,
  label: string,
  key: string,
  value: any,
  inputtype: string,
  rules: object | object[],
  options?: (object|number|string)[]
}

interface FormItemProps {
  item: NFormItemProps,
  layout: object,
  getFieldDecorator: any
}

const switchItem = (item: NFormItemProps): React.ReactNode => {
  const {type, options} = item;
  switch (type) {
    case 'int':
      return <InputNumber style={{ width: '100%' }} />
    case 'text':
      return <Input />;
    case 'date':
      return <DatePicker style={{ width: '100%' }} />;
    case 'select':
      return (
        <Select>
          {
            options.map((option: any, index: number) => {
              return (<Option key={index} value={option}>{option}</Option>)
            })
          }
        </Select>
      )
    default:
      return <Input />
  }
}

const renderFormItem:React.FC<FormItemProps> = ({item, layout, getFieldDecorator }) => {
  const { label, key, rules, value } = item
  return (
    <FormItem key={key} label={label} {...layout}>
      {
        getFieldDecorator(key, {
          initialValue: value,
          rules
        })(
          switchItem(item)
        )
      }
    </FormItem>
  )
}

const  MyForm: React.FunctionComponent<FormProps> = (props) =>{
  const {form, layout, schema} = props
  const { getFieldDecorator } = form
  return (
    <Form>
      {
      schema.map( item => renderFormItem({item, layout, getFieldDecorator}))
      }
    </Form>
  )
}
MyForm.defaultProps = {
  layout: defaultFormItemLayout,
  hideRequiredMark: false,
  onSubmit(){}
}

export default Form.create<FormProps>()(MyForm)
