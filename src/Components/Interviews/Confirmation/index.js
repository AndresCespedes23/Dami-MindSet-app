import React from 'react';
import styles from './confirmation.module.css';
import Button from '../../Shared/Button';

function Confirmation({ message, handleDelete, handleShowModal }) {
  return (
    <div>
      <p>{message}</p>
      <div className={styles.container}>
        <Button
          type="confirm"
          onClick={() => {
            handleDelete();
            handleShowModal();
          }}
        />
        <Button type="cancel" onClick={handleShowModal} />
      </div>
    </div>
  );
}

export default Confirmation;
