import { useState, useEffect } from "react";
import axios from "axios";

import "./Tasks.scss";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

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

    return(
        <div className="tasks-container">
            <h2>Minhas tarefas</h2>

            <div className="last-tasks">
                <h3>Últimas tarefas</h3>
                <div className="tasks-list">
                    {tasks.filter((task) => task.status === false).map((lastTask) => (<p>{lastTask.description}</p>))}
                </div>
            </div>

            <div className="completed-tasks">
                <h3>Tarefas concluidas</h3>
                <div className="tasks-list">
                    {tasks.filter((task) => task.status).map((completedTask => (<p>{completedTask.description}</p>)))}
                </div>
            </div>
        </div>
    )

}

export default Tasks;