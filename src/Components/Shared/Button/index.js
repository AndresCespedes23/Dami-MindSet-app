import styles from './button.module.css';
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaRegWindowClose,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';

function Button({ type, onClick, text }) {
  return (
    <button className={styles[type]} onClick={onClick}>
      {type === 'add' && <FaPlus />}
      {type === 'update' && <FaEdit />}
      {type === 'delete' && <FaTrashAlt />}
      {type === 'close' && <FaRegWindowClose />}
      {type === 'submit' && 'SUBMIT'}
      {type === 'search' && `Search ${text ? text : ''}`}
      {type === 'addNew' && `ADD NEW ${text ? text : ''}`}
      {type === 'confirm' && 'YES'}
      {type === 'cancel' && 'NO'}
      {type === 'back' && (
        <>
          <FaAngleLeft size={25} />
          {text}
        </>
      )}
      {type === 'next' && (
        <>
          {text}
          <FaAngleRight size={25} />
        </>
      )}
    </button>
  );
}

export default Button;
