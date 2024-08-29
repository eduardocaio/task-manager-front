const TaskItem = ({ task }) => {

    return (<>
        <h1>{task.description}</h1>
        <p>{task.status ? 'Completa' : 'Não completa'}</p>
    </>);
};

export default TaskItem;
