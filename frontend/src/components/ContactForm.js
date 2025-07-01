import React, { useState, useEffect } from 'react';

export default function ContactForm({ onSubmit, editing, cancel }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (editing) setForm(editing);
    }, [editing]);

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = e => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', email: '', phone: '' });
    };

    return (
        <form onSubmit={submit}>
            <h2>{editing ? 'Edit' : 'Add'} Contact</h2>
            <input name="name" value={form.name} onChange={handle} required placeholder="Name" />
            <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email" />
            <input name="phone" value={form.phone} onChange={handle} required placeholder="Phone" />
            <button type="submit">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={cancel}>Cancel</button>}
        </form>
    );
}
