import styles from './message.module.css';

// eslint-disable-next-line react/prop-types
function Message({ type, message }) {
  return (
    <div
      className={
        type === 'error'
          ? styles.error
          : type === 'success'
          ? styles.success
          : type === 'warning'
          ? styles.warning
          : styles.hide
      }
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
