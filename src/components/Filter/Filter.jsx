import { useDispatch} from 'react-redux';

import styles from './filter.module.css';
import { setFilter } from 'redux/filter-slice';

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return ( 
    <div>
    <p className={styles.text}>Find contacts by name</p>
     <input className={styles.search} 
      type="text" 
      pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
      onChange={filter}/>
     </div>
   )
}; 