import React,{
  useState
} from 'react'

import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const Home: React.FC = () =>{
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.random() * 100
      }
    ]);
  };

  const deleteItem = () => {
    items.pop()
    setItems([].concat(items))
  }

  return (
    <div>
      <button onClick={addItem}>Add a number</button>
      <button onClick={deleteItem}>Delete a number</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}
export default Home
