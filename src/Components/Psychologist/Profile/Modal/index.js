import React from 'react';
import Button from 'Components/Shared/Button';
import styles from './psycho-profile.module.css';
import PsychologistsProfileForm from 'Components/Psychologist/Profile/Form';

function Modal({ handleShowModal, handleSubmit, modalType }) {
  let modalComponent;
  switch (modalType) {
    case 'edit profile psycho':
      modalComponent = (
        <PsychologistsProfileForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
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
