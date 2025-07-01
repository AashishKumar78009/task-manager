import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { createTask, updateTask } from "./taskApi";
import './App.css';

function App() {
    const [editingTask, setEditingTask] = useState(null);

    const handleSave = async (data) => {
        if (editingTask) {
            await updateTask(editingTask.id, { ...editingTask, ...data });
            setEditingTask(null);
        } else {
            await createTask(data);
        }
        window.location.reload(); // Simplified refresh
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📝 Task Manager</h1>
            <TaskForm onSubmit={handleSave} initialTask={editingTask} />
            <TaskList onEdit={setEditingTask} />
        </div>
    );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import { fetchContacts, createContact, updateContact, deleteContact } from './api';
// import ContactForm from './components/ContactForm';
// import ContactList from './components/ContactList';

// function App() {
//     const [contacts, setContacts] = useState([]);
//     const [editing, setEditing] = useState(null);

//     useEffect(() => {
//         fetchContacts().then(res => setContacts(res.data));
//     }, []);

//     const handleSubmit = async (data) => {
//         if (editing) {
//             const res = await updateContact(editing.id, data);
//             setContacts(contacts.map(c => c.id === editing.id ? res.data : c));
//         } else {
//             const res = await createContact(data);
//             setContacts([...contacts, res.data]);
//         }
//         setEditing(null);
//     };

//     const handleDelete = async id => {
//         await deleteContact(id);
//         setContacts(contacts.filter(c => c.id !== id));
//     };

//     return (
//         <div className="App">
//             <h1>Contact Manager</h1>
//             <ContactForm onSubmit={handleSubmit} editing={editing} cancel={() => setEditing(null)} />
//             <ContactList contacts={contacts} onEdit={setEditing} onDelete={handleDelete} />
//         </div>
//     );
// }

// export default App;
