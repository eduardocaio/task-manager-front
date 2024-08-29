import { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([{
    id: "1",
    description: 'Estudar programacao',
    status: false
  }, {
    id: '2',
    description: 'Ler',
    status: true
  }]);

  const fetchTasks = async () => {
    try {
      const {data} = await axios.get('http://localhost:8080/tasks');
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <>
      {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </>
  );

};

export default App;
