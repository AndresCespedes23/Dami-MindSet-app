import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import PostulantsForm from '../../Postulants/Form';
import Confirmation from '../../Postulants/Confirmation';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Button type="close" onClick={handleShowModal} />
        </div>
        {modalType === 'postulants' && <PostulantsForm handleSubmit={handleSubmit} meta={meta} />}
        {modalType === 'deleteConfirmation' && <Confirmation />}
      </div>
    </div>
  );
}

export default Modal;
