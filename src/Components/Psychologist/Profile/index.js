import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import { getOnePsychologist } from 'redux/Psychologists/thunks';
import { Link } from 'react-router-dom';

function PsychologistProfile() {
  const psychologist = useSelector((store) => store.psychologists.psychologist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOnePsychologist(sessionStorage.getItem('id')));
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div>
            <Button type={'backBtnAdmin'} />
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
              <Link to="/psychologist/availability">
                <button>Availability</button>
              </Link>
            </div>
          </div>
          <div className={styles.editBtn}>
            <Button type={'editInfo'} />
          </div>
        </div>
        <div className={styles.footer}>
          <span>Status</span>
          <p className={styles.statusActive}>ACTIVE</p>
        </div>
      </div>
    </section>
  );
}

export default PsychologistProfile;
