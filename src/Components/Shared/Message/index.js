import styles from './message.module.css';

function Message({ type, message }) {
  return (
    <div className={styles[type] || styles.hide}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
