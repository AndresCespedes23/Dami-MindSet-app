import styles from './button.module.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Button({ type, message }) {
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
      {message}
    </button>
  );
}

Button.defaultProps = {
  type: 'add',
  message: 'Add'
};
Button.prototype = {
  type: PropTypes.string,
  message: PropTypes.string
};
export default Button;
