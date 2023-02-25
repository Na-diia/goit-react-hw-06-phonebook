import { useSelector, useDispatch } from 'react-redux';

import styles from './contact-list.module.css';
import { getContacts, getFilter } from 'redux/selectors';
import { removeContact  } from 'redux/contacts-slice';

export const ContactList =() => {
  const contactsValue = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const findContact = () => {
    return contactsValue.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.trim().toLowerCase());
    });
  };
  const foundContacts = findContact();

  const contacts = foundContacts.map(({id, name, number}) => {
    return (<li key={id}><p className={styles.item}>{name} : {number}</p>
    <button type="button" className={styles.delete}
    onClick={() => dispatch(removeContact(id))}>Delete</button></li>)});

  return(
    <ul className={styles.list}>
      {contacts}
    </ul>
  )
};