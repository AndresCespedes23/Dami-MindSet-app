import styles from './modal.module.css';
import Button from 'Components/Shared/Button';
import PersonalInfoForm from 'Components/Postulant/Summary/FormPostulant/PersonalInfo';
import EducationForm from 'Components/Postulant/Summary/FormPostulant/Education';
import WorkForm from 'Components/Postulant/Summary/FormPostulant/WorkExperience';
import OtherForm from 'Components/Postulant/Summary/FormPostulant/OtherInfo';

function ProfileModal({ handleShowModal, modalType, handleSubmit }) {
  let modalComponent;
  switch (modalType) {
    case 'personal-info':
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
    case 'other':
      modalComponent = <OtherForm handleSubmit={handleSubmit} handleShowModal={handleShowModal} />;
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
