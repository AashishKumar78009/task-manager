import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description || "");
        }
    }, [initialTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
            />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">Save Task</button>
        </form>
    );
}
