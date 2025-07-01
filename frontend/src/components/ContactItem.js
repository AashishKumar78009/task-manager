import React from 'react';

export default function ContactItem({ contact, onEdit, onDelete }) {
    return (
        <div className="item">
            <div>
                <strong>{contact.name}</strong><br />
                {contact.email}<br />
                {contact.phone}
            </div>
            <div>
                <button onClick={() => onEdit(contact)}>Edit</button>
                <button onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
        </div>
    );
}
