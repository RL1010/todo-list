import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask/AddTask';
import Alert from './components/Alert/Alert';
import Author from './components/Author.js/Author';
import Filter from './components/Filter/Filter';
import Input from './components/Input/Input';
import List from './components/List/List';
import './index.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('taskList');
  if (list) {
    return JSON.parse(localStorage.getItem('taskList'));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState({});
  const [status, setStatus] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const [filterText, setFilterText] = useState('all');
  const [filterTodos, setFilterToDos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // alert
      showAlert(true, 'danger', 'Please enter a value');
    } else if (name && isEditing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name, author: userName };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Value changed succesfully');
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        status: status,
        author: userName,
      };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'success', 'Task added succesfully');
      console.log(list);
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const scpecificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(scpecificItem.title);
    setUserName(scpecificItem.author);
  };
  const completeHandler = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        }
        return item;
      })
    );
  };
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <div className="top-background">
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h1>TO DO LIST</h1>
            <Author userName={userName} setUserName={setUserName} />
            <Input name={name} setName={setName} />
            <div className="main-buttons">
              <AddTask isEditing={isEditing} />
              <Filter
                list={list}
                setFilterToDos={setFilterToDos}
                filterText={filterText}
                setFilterText={setFilterText}
              />
            </div>
          </form>
          {list.length > 0 && (
            <div>
              <List
                items={list}
                removeItem={removeItem}
                editItem={editItem}
                completeHandler={completeHandler}
                filterTodos={filterTodos}
              />
              <button className="clear-btn" onClick={clearList}>
                Clear items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
