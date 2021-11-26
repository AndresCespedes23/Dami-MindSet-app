import styles from './button.module.css';
import { FaPlus, FaTrashAlt, FaEdit, FaRegWindowClose} from 'react-icons/fa';

function Button({ type}) {
  return (
    <button className={styles[type]}>
      {type === 'add' && <FaPlus />}
      {type === 'update' && <FaEdit />}
      {type === 'delete' && <FaTrashAlt />}
      {type === 'close' && <FaRegWindowClose />}
    </button>
  );
}

export default Button;
