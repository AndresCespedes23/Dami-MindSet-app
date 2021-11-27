import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import PostulantsForm from '../../Postulants/Form';
import Confirmation from '../../Postulants/Confirmation';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'postulants':
      modalComponent = (
        <PostulantsForm
          id={meta.id}
          handleSubmit={handleSubmit}
          handleShowModal={handleShowModal}
        />
      );
      break;
    case 'delete':
      modalComponent = (
        <Confirmation
          message="Did you want to Delete?"
          handleDelete={handleSubmit}
          handleShowModal={handleShowModal}
        />
      );
      break;
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
