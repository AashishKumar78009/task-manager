import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../taskApi";

export default function TaskList({ onEdit }) {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const res = await fetchTasks();
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const toggleComplete = async (task) => {
        await updateTask(task.id, { ...task, completed: !task.completed });
        loadTasks();
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                    />
                    <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.title}: {task.description}
                    </span>
                    <button onClick={() => onEdit(task)}>✏️</button>
                    <button onClick={() => handleDelete(task.id)}>🗑️</button>
                </li>
            ))}
        </ul>
    );
}
