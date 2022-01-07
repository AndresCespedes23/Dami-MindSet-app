import styles from './modal.module.css';
import Button from 'Components/Shared/Button';
import AboutMeForm from 'Components/Postulant/Profile/Forms/AboutMe';
import PersonalInfoForm from 'Components/Postulant/Profile/Forms/PersonalInfo';
import EducationForm from 'Components/Postulant/Profile/Forms/Education';
import WorkForm from 'Components/Postulant/Profile/Forms/Work';
import CoursesForm from 'Components/Postulant/Profile/Forms/Courses';
import OtherInfoForm from 'Components/Postulant/Profile/Forms/OtherInfo';

function ProfileModal({ handleShowModal, modalType, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'about':
      modalComponent = (
        <AboutMeForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;

    case 'personal info':
      modalComponent = (
        <PersonalInfoForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;

    case 'education':
      modalComponent = (
        <EducationForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;

    case 'work':
      modalComponent = <WorkForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />;
      break;

    case 'courses':
      modalComponent = (
        <CoursesForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
      );
      break;

    case 'other info':
      modalComponent = (
        <OtherInfoForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />
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

export default ProfileModal;
