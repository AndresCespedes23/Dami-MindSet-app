import React from 'react';
import styles from './modal.module.css';
import Button from 'Components/Shared/Button';
import SessionsForm from 'Components/Admin/Sessions/Form';
import AdminsForm from 'Components/Admin/Admins/Form';
import Confirmation from './Confirmation';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';
import PositionsForm from 'Components/Admin/Positions/Form';
import InterviewForm from 'Components/Admin/Interviews/Form';
import PostulantsForm from 'Components/Admin/Postulants/Form';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import ClientsForm from 'Components/Admin/Clients/Form';
function Modal({ handleShowModal, modalType, meta, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'clients':
      modalComponent = (
        <ClientsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'admins':
      modalComponent = (
        <AdminsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'positions':
      modalComponent = (
        <PositionsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'interviews':
      modalComponent = (
        <InterviewForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'postulants':
      modalComponent = (
        <PostulantsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'profiles':
      modalComponent = (
        <ProfilesForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;
    case 'sessions':
      modalComponent = (
        <SessionsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
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
    case 'psychologists':
      modalComponent = (
        <PsychologistsForm
          id={meta}
          handleSubmit={handleSubmit}
          handleShowModal={handleShowModal}
        />
      );
      break;
    case 'applications':
      modalComponent = (
        <ApplicationsForm id={meta} handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
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
