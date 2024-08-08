import React, { useState } from 'react';
import '../Styles/TodoList.css';
import { v4 as uuidv4 } from 'uuid'
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, completeTask, deleteTask } from '../Redux/Action';

const TodoList = () => {

    const [task, setTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState("");
    const dispatch = useDispatch();

    const tasks = useSelector((state) =>
        state.task.tasks.filter((task) => !task.completed)
    );

    const completedTask = useSelector((state) =>
        state.task.tasks.filter((task) => task.completed)
    );

    const handlerSubmitTask = (e) => {
        e.preventDefault();
        if (task.trim()) {
            dispatch(
                addTask({
                    id: uuidv4(),
                    text: task,
                    completed: false,
                    date: new Date().toLocaleString(),
                })
            );
            setTask("");
        }
    };

    const handlerUpdateSubmit = (e) => {
        e.preventDefault();
        if (editTask.trim) {
            dispatch(updateTask(editTaskId, editTask));
            setEditTaskId(null);
            setEditTask("");
        }
    };

    const handleEdit = (tasks) => {
        setEditTaskId(task.id);
        setEditTask(task.text);
    };



    return (
        <>
            <div className="container-fluid p-5">
                <h1>Todo List</h1>
                <div className="todolist">
                    <form onSubmit={editTaskId ? handlerUpdateSubmit : handlerSubmitTask}>
                        <input type="text" placeholder='add a new task' value={editTaskId ? editTask : task}
                            onChange={(e) => editTaskId
                                ? setEditTask(e.target.value)
                                : setTask(e.target.value)} />
                        <button type='submit'>
                            {editTaskId ? "Update Task" : "Add Task"}
                        </button>
                    </form>

                    {tasks.length > 0 ? (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.text}</td>
                                            <td>{task.date}</td>
                                            <td>
                                                <button onClick={() => handleEdit(task)}> <FaEdit /> </button>
                                                <button onClick={() => dispatch(completedTask(task.id))}> <FaCheck /> </button>
                                                <button onClick={() => dispatch(deleteTask(task.id))}> <FaTrash /> </button>
                                            </td>
                                        </tr>
                                    ))};

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Add Somenthing here</p>
                    )};

                    {completedTask.length > 0 && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Date</th>
                                        <th>Completed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    completedTask.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.text}</td>
                                            <td>{task.date}</td>
                                            <td>Completed</td>
                                        </tr>
                                    ))
                                    };
                                </tbody>
                            </table>
                        </div>
                    )}



                </div>
            </div>
        </>
    );
}

export default TodoList;