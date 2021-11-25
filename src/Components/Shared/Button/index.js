import styles from './button.module.css';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';

function Button({ type }) {
  return (
    <button className={styles[type]}>
      {type === 'add' && <FaPlus />}
      {type === 'update' && <FaEdit />}
      {type === 'delete' && <FaTrashAlt />}
    </button>
  );
}

export default Button;
