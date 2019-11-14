
import React from "react";
import { Radio, Form, Input, InputNumber,
  DatePicker, Select, Button,Icon } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";

const FormItem = Form.Item
const { Option } = Select
// 默认的layout
export const defaultLabelColSpan = 6

const defaultFormItemLayout = {
  labelCol: { span: defaultLabelColSpan },
  wrapperCol: { span: 14 },
}

interface FormProps extends FormComponentProps {
  // forwardedRef?: React.RefObject<Form>;
  layout: object,
  schema: NFormItemProps[],
  hideRequiredMark: boolean,
  // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleSubmit: (values: Object) => void,
  handleChange: (value: any, name: string) => void,
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
interface NFormItemProps {
  field: string,
  key: string,
  label: string,
  value: any,
  type: string,
  disabled: boolean,
  placeholder: string,
  iconType: string,
  class: string,
  rules?: ValidationRule[],
  options?: (object|number|string)[]
}

interface FormItemProps {
  item: NFormItemProps,
  layout: object,
  getFieldDecorator: any
}

class MyForm extends React.Component<FormProps, any> {
  static defaultProps = {
    layout: defaultFormItemLayout,
    hideRequiredMark: false,
    handleSubmit(){},
    handleChange(){},
    handleBlur(){},
    handleFocus(){}
  }

  constructor(props: FormProps) {
    super(props);
  }

  switchItem = (item: NFormItemProps): React.ReactNode => {
    const {type, options, placeholder,iconType} = item;
    switch (type) {
      case 'int':
        return <InputNumber style={{ width: '100%' }} placeholder= {placeholder} />
      case 'text':
        return <Input placeholder= {placeholder} prefix={iconType?<Icon type={iconType} />:''} allowClear />;
      case 'password':
        return <Input type='password' placeholder= {placeholder} prefix={iconType?<Icon type={iconType} />:''} allowClear />
      case 'date':
        return <DatePicker style={{ width: '100%' }} placeholder= {placeholder} />;
      case 'select':
        return (
          <Select placeholder= {placeholder}>
            {
              options && options.map((option: any, index: number) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            }
          </Select>
        )
      case 'radio':
        return (
          <Radio.Group>
            {
              options && options.map((option: any, index: number) => {
                return (<Radio key={index} value={option}>{option}</Radio>)
              })
            }
          </Radio.Group>
        )
      default:
        return <Input placeholder= {placeholder} allowClear />
    }
  }
  renderFormItem: React.FC<FormItemProps> = ({item, layout, getFieldDecorator }) => {
    const { label, key, field, rules, value } = item
    return (
      <FormItem key={key} label={label} {...layout}>
        {
           getFieldDecorator(field, {
            validateTrigger: "onBlur",
            initialValue: value,
            rules
           })(
             this.switchItem(item)
           )
        }
       </FormItem>
     )
  }
  onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
       this.props.handleSubmit(e)
    //   }
    // })
  }

  render(){
    const {form, layout, schema} = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.onHandleSubmit}>
        {
          schema.map( item => this.renderFormItem({item, layout, getFieldDecorator}))
        }
      </Form>
    )
  }
}

export default Form.create<FormProps>({
  // withRef: true,
  onValuesChange : (props, changedValues, allValues) => {
    let val: any[] = Object.values(changedValues)
    let keyName: string[] = Object.keys(changedValues)
    props.handleChange(val[0], keyName[0])
  }
})(MyForm)


// const  MyForm: React.FunctionComponent<FormProps> = (props) =>{
//   const {form, layout, schema, handleSubmit} = props
//   const { getFieldDecorator } = form

//   {/**form item */}
//   const renderFormItem:React.FC<FormItemProps> = ({item, layout, getFieldDecorator }) => {
//     const { label, key, field, rules, value } = item
//     return (
//       <FormItem key={key} label={label} {...layout}>
//         {
//           getFieldDecorator(field, {
//             validateTrigger: "onBlur",
//             initialValue: value,
//             rules
//           })(
//             switchItem(item)
//           )
//         }
//       </FormItem>
//     )
//   }
//   {/** input、select... */}
  // const switchItem = (item: NFormItemProps): React.ReactNode => {
  //   const {type, options, placeholder} = item;
  //   switch (type) {
  //     case 'int':
  //       return <InputNumber style={{ width: '100%' }} placeholder= {placeholder} />
  //     case 'text':
  //       return <Input placeholder= {placeholder} allowClear />;
  //     case 'password':
  //       return <Input type='password' placeholder= {placeholder} allowClear />
  //     case 'date':
  //       return <DatePicker style={{ width: '100%' }} placeholder= {placeholder} />;
  //     case 'select':
  //       return (
  //         <Select placeholder= {placeholder}>
  //           {
  //             options && options.map((option: any, index: number) => {
  //               return (<Option key={index} value={option}>{option}</Option>)
  //             })
  //           }
  //         </Select>
  //       )
  //     case 'radio':
  //       return (
  //         <Radio.Group>
  //           {
  //             options && options.map((option: any, index: number) => {
  //               return (<Radio key={index} value={option}>{option}</Radio>)
  //             })
  //           }
  //         </Radio.Group>
  //       )
  //     default:
  //       return <Input placeholder= {placeholder} allowClear />
  //   }
  // }

  // const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       // handleSubmit()
  //     }
  //   })
  // }

  // return (
  //   <Form onSubmit={onHandleSubmit} >
  //     {
  //       schema.map( item => renderFormItem({item, layout, getFieldDecorator}))
  //     }
  //   </Form>
  // )
// }
// MyForm.defaultProps = {
//   layout: defaultFormItemLayout,
//   hideRequiredMark: false,
//   handleSubmit(){},
//   handleChange(){},
//   handleBlur(){},
//   handleFocus(){}
// }


