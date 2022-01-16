import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Psychologist/Profile/Modal';
import { setShowModal, setModalType } from 'redux/Psychologists/actions';
import { getOnePsychologist, updatePsychologist } from 'redux/Psychologists/thunks';
import { Link } from 'react-router-dom';

function PsychologistProfile() {
  const psychologist = useSelector((store) => store.psychologists.psychologist);
  const showModal = useSelector((state) => state.psychologists.showModal);
  const modalType = useSelector((state) => state.psychologists.modalType);
  const [idActive, setIdActive] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOnePsychologist(sessionStorage.getItem('id')));
  }, [dispatch]);

  const handleClickUpdateInfo = (id) => {
    dispatch(setModalType('edit profile psycho'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdatePsychologist = (psychologist) => {
    dispatch(updatePsychologist(psychologist, idActive)).then(() => {
      dispatch(getOnePsychologist(sessionStorage.getItem('id')));
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };
  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div>
            <Button type={'backBtnPsycho'} onClick={() => history.back()} />
          </div>
          <div className={styles.headercolumn}>
            <h2 className={styles.profileTitle}>Profile</h2>
            <span className={styles.adminTitle}>Psychologist</span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.columnInfo}>
            <div className={styles.adminInfo}>
              Name:<span>{psychologist.name}</span>
            </div>
            <div className={styles.adminInfo}>
              Username:<span>{psychologist.username}</span>
            </div>
            <div className={styles.adminInfo}>
              Email:
              <span>{psychologist.email}</span>
            </div>
            <div className={styles.adminInfo}>
              Phone:
              <span>{psychologist.phoneNumber}</span>
            </div>
            <div className={styles.adminInfo}>
              Enrollment Number:
              <span>{psychologist.enrollmentNumber}</span>
            </div>
            <div className={styles.adminInfo}>
              Status
              <p className={styles[psychologist.status?.toLowerCase()]}>{psychologist.status}</p>
            </div>
            <div className={styles.adminInfo}>
              <Link to="/psychologist/availability">
                <button>Availability</button>
              </Link>
            </div>
          </div>
          <div className={styles.editBtn}>
            <Button type={'editInfo'} onClick={() => handleClickUpdateInfo(psychologist._id)} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={handleUpdatePsychologist}
          meta={idActive}
        />
      )}
    </section>
  );
}

export default PsychologistProfile;
