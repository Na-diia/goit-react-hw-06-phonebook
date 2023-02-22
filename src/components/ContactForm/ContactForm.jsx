import PropTypes from 'prop-types';
import { useState } from "react";

import styles from './contact-form.module.css';

export const ContactForm = ({addContact}) => {
  const [data, setData] = useState({
    name: '',
    number: '',
  });

const formChange = ({target}) => {
  const {name, value} = target;
  setData(prevData => { 
    return {...prevData, [name]: value }
  });
};

  const  handleSubmit = (event) => {
    event.preventDefault();
    addContact(data.name, data.number);
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

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};