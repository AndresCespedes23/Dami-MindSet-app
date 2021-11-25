import styles from './button.module.css';
import PropTypes from 'prop-types';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
// eslint-disable-next-line react/prop-types
function Button({ type }) {
  return (
    <button
      className={
        type === 'add'
          ? styles.buttonAdd
          : type === 'delete'
          ? styles.buttonDelete
          : type === 'update'
          ? styles.buttonUpdate
          : styles.hide
      }
    >
      {type === 'add' ? (
        <FaPlus />
      ) : type === 'delete' ? (
        <FaTrashAlt />
      ) : type === 'update' ? (
        <FaEdit />
      ) : (
        <FaPlus />
      )}
    </button>
  );
}

Button.defaultProps = {
  type: 'add'
};
Button.prototype = {
  type: PropTypes.string
};
export default Button;
