import React, { useState, useEffect }  from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

import styles from './app.module.css';

export function App () {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem("my-contact"));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("my-contact", JSON.stringify(contacts));
  }, [contacts]);

const addContact = (name, number) => { 
  const newContact = { id: nanoid(), name, number};

  if(contacts.find(item => {
    return item.name.toLowerCase() === newContact.name.toLowerCase();
  })) {
    return alert (`${newContact.name} is already in contacts!`);
  };
  setContacts(prevContacts => { 
    return [newContact, ...prevContacts];
  });
};

const  filterChange = ({target}) => {
    setFilter( target.value );
};

const  deleteContact = contactId => {
  setContacts(prevContacts => 
   prevContacts.filter(contact => contact.id !== contactId));
};

const getFilterContacts = () => {
  if(!filter) {
    return contacts;
  }

  const normalizedFilter = filter.toLowerCase();
  const result = contacts.filter(({name}) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  return result;
};

const filterContact = getFilterContacts();

return (
   <div className={styles.container}>
    <h1 className={styles.title}>Phone Book</h1>
    <ContactForm 
    addContact={addContact}/>
    
    <h2 className={styles.name}>Contacts</h2>
    <Filter filter={filterChange} value={filter}/>
    {contacts.length > 0 && <ContactList filter={filterContact}
    deleteContact={deleteContact} />}
    {contacts.length <=0 && <p className={styles.text}>No contacts in list!</p>}
   </div>
  );
};