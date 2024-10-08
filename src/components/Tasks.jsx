import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

import "./Tasks.scss";

import TaskItem from "./TaskItem"
import AddTask from "./AddTask";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const alert = useAlert();

    const fetchTasks = async () => {
        try {
          const {data} = await axios.get('http://localhost:8080/tasks');
          setTasks(data);
        } catch (_error) {
            alert.error("Não foi possível exibir as tarefas!")
        }
    }

    const lastTasks = useMemo(() => {
        return tasks.filter(task => task.status === false);
    }, [tasks])

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.status === true);
    }, [tasks])

    useEffect(() => {
        fetchTasks();
    }, [])

    return(
        <div className="tasks-container">
            <h2>Minhas tarefas</h2>

            <div className="last-tasks">
                <h3>Últimas tarefas</h3>
                <AddTask fetchTasks={fetchTasks}/>
                <div className="tasks-list">
                    {lastTasks.map((lastTask) => (<TaskItem key={lastTask} task={lastTask} fetchTasks={fetchTasks}/>))}
                </div>
            </div>

            <div className="completed-tasks">
                <h3>Tarefas concluidas</h3>
                <div className="tasks-list">
                    {completedTasks.map((completedTask) => (<TaskItem key={completedTask.id} task={completedTask} fetchTasks={fetchTasks}/>))}
                </div>
            </div>
        </div>
    )

}

export default Tasks;