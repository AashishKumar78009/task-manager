import React from 'react';
import ContactItem from './ContactItem';

export default function ContactList({ contacts, onEdit, onDelete }) {
    if (!contacts.length) return <p>No contacts.</p>;
    return (
        <div>
            {contacts.map(c => (
                <ContactItem key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
