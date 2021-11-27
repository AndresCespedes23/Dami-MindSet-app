import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import InterviewForm from '../../Interviews/Form/index';
import Confirmation from '../../Interviews/Confirmation/index';

function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'interviews':
      modalComponent = <InterviewForm id={meta} handleSubmit={handleSubmit} />;
      break;
    case 'delete':
      modalComponent = (
        <Confirmation
          message="Are you sure to delete this interview?"
          handleDelete={handleSubmit}
          handleShowModal={handleShowModal}
        />
      );
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
