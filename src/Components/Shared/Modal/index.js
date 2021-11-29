import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import Confirmation from '../Confirmation';
import PsychologistsForm from '../../Psychologists/Form';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'postulants':
      modalComponent = (
        <PsychologistsForm
          id={meta}
          handleSubmit={handleSubmit}
          handleShowModal={handleShowModal}
        />
      );
      break;
    case 'psychologists':
      modalComponent = (
        <PsychologistsForm
          id={meta}
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
