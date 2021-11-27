import styles from './button.module.css';
import { FaPlus, FaTrashAlt, FaEdit, FaRegWindowClose } from 'react-icons/fa';

function Button({ type, onClick }) {
  return (
    <button className={styles[type]} onClick={onClick}>
      {type === 'add' && <FaPlus />}
      {type === 'update' && <FaEdit />}
      {type === 'delete' && <FaTrashAlt />}
      {type === 'close' && <FaRegWindowClose />}
      {type === 'confirm' && 'YES'}
      {type === 'cancel' && 'NO'}
    </button>
  );
}

export default Button;
