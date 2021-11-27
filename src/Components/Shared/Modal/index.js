import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';
import PostulantsForm from '../../Postulants/Form';

function Modal({ handleShowModal, form, meta, handleSubmit }) {
  let modalComponent;
  switch (form) {
    case 'clients':
      modalComponent = <PostulantsForm id={meta.id} handleSubmit={handleSubmit} />;
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
