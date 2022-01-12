import styles from './button.module.css';
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaRegWindowClose,
  FaAngleLeft,
  FaAngleRight,
  FaPen,
  FaEye
} from 'react-icons/fa';

function Button({ type, onClick, text }) {
  return (
    <button className={styles[type]} onClick={onClick}>
      {type === 'add' && <FaPlus />}
      {type === 'update' && <FaEdit />}
      {type === 'delete' && <FaTrashAlt />}
      {type === 'info' && <FaEye />}
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
      {type === 'editInfo' && (
        <>
          {'Edit Information'}
          <FaPen className={styles.fapen} />
        </>
      )}
      {type === 'backBtnPsycho' && (
        <>
          <FaAngleLeft size={25} />
          {text}
        </>
      )}
      {type === 'backBtnAdmin' && (
        <>
          <FaAngleLeft size={25} />
          {text}
        </>
      )}
    </button>
  );
}

export default Button;
