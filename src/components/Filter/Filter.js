import { useEffect } from 'react';
import './Filter.css';

const Filter = ({ filterText, setFilterText, setFilterToDos, list }) => {
  const filterHandler = () => {
    switch (filterText) {
      case 'completed':
        setFilterToDos(list.filter((item) => item.status === true));
        break;
      case 'uncompleted':
        setFilterToDos(list.filter((item) => item.status === false));
        break;
      default:
        setFilterToDos(list);
        break;
    }
  };
  const statusHandler = (e) => {
    setFilterText(e.target.value);
  };
  useEffect(() => {
    filterHandler();
  }, [list, filterText]);
  return (
    <select onChange={statusHandler} className="filter">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  );
};

export default Filter;
