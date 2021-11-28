import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import ApllicationForm from '../../Applications/Form';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'applications':
      modalComponent = (
        <ApllicationForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;

    // case 'delete'
  }
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Button type="close" onClick={handleShowModal} />
        </div>
        {modalComponent}
      </div>
    </div>
  );
}
export default Modal;
