import React,{
  useState, useEffect
} from 'react'
import { Form, Popconfirm, Table } from 'antd';
import EditableCell from './editable-cell';
export const EditableContext = React.createContext();


const EditableTable: React.FC = (props) => {
  const [editingKey, setEditingKey] = useState('')
  const [data, setData] = useState([])
  const columns = [{
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },{
    title: 'area',
    dataIndex: 'area',
    width: '15%',
    editable: true,
  },{
    title: 'number',
    dataIndex: 'number',
    width: '15%',
    editable: true,
  },{
    title: 'status',
    dataIndex: 'status',
    width: '15%',
    editable: true,
  },{
    title: 'operation',
    dataIndex: 'operation',
    render: (text, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <EditableContext.Consumer>
            {form => (
              <a
                onClick={() => save(form, record.key)}
                style={{ marginRight: 8 }}
              >
                Save
              </a>
            )}
          </EditableContext.Consumer>
          <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <a disabled={editingKey !== ''} onClick={() => edit(record.key)}>
          Edit
        </a>
      );
    },
  }]

  const isEditing = record => record.key === editingKey
  const save = (form, key) => {}
  const edit = (key) => {}
  const cancel = (key) => {}


  const components = {
    body: {
      cell: EditableCell,
    }
  };

  useEffect(()=> {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      setData(result.data);
    };
    fetchData()
  },[])

  return (
    <EditableContext.Provider value={props.form}>
      <Table
        components={components}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </EditableContext.Provider>
  )
}


const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable
