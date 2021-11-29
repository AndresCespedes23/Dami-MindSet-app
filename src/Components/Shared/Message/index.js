import { useEffect } from 'react';
import styles from './message.module.css';

function Message({ type, message, showMessage }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showMessage();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [showMessage]);
  return (
    <div className={styles[type] || styles.hide}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
