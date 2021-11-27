import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import Form from '../../Postulants/Form';
import Confirmation from '../../Postulants/Confirmation';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Button type="close" onClick={handleShowModal} />
        </div>
        {modalType === 'addForm' && <Form handleSubmit={handleSubmit} />}
        {modalType === 'editForm' && <Form handleSubmit={handleSubmit} meta={meta} />}
        {modalType === 'deleteConfirmation' && (
          <Confirmation
            message={'Did you want to Delete?'}
            handleDelete={handleSubmit}
            handleShowModal={handleShowModal}
          />
        )}
      </div>
    </div>
  );
}

export default Modal;
