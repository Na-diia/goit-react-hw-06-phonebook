import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

import styles from './app.module.css';

export function App () {

return (
   <div className={styles.container}>
    <h1 className={styles.title}>Phone Book</h1>
    <ContactForm /> 
    <h2 className={styles.name}>Contacts</h2>
    <Filter/>
    <ContactList/>
   </div>
  );
};