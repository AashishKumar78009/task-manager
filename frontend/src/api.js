import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8000' });
export const fetchContacts = () => API.get('/contacts');
export const createContact = data => API.post('/contacts', data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = id => API.delete(`/contacts/${id}`);
