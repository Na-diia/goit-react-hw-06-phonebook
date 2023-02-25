import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import styles from './contact-form.module.css';
import { getContacts } from "redux/selectors";
import { addContact } from 'redux/contacts-slice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formChange = ({target}) => {
    const {name, value} = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
    }
  };

  const formSubmit = (newContact) => {
    const isExist = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
    );
    if (isExist) {
      return alert(`${newContact.name} is already in contacts`);
    }
    dispatch(addContact(newContact));
};

  const  handleSubmit = (event) => {
    event.preventDefault();
    formSubmit({name, number, id: nanoid() });
    event.target.reset();
  };

  return (
       <form autoComplete="on"
       className={styles.form}
       onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>Name
           <input className={styles.input} 
          placeholder="Jacob Mercer"
          type="text" name="name" 
          onChange={formChange}
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required/>
        </label>
        <label htmlFor="number" className={styles.label}>Number
        <input className={styles.input}
        placeholder=" 257-42-21"
        type="tel"
        onChange={formChange}
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required/>
        </label>
        <button type="submit" className={styles.btn}> Add contact</button>
       </form>
  )
};
