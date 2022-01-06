import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePostulant } from 'redux/Postulants/thunks';
import { getOneInterview } from 'redux/Interviews/thunks';
import styles from './change-interviewed.module.css';
import Spinner from 'Components/Shared/Spinner';
import Button from 'Components/Shared/Button';

function ChangeInterviewed() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const interview = useSelector((store) => store.interviews.interview);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePostulant(id));
    dispatch(getOneInterview(id));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.header}>
          <div>
            <Button type={'backBtnPsycho'} />
          </div>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Profile</h2>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.box1}>
            <div>
              <img
                className={styles.postulantPhoto}
                src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
              ></img>
            </div>
            <div>Status</div>
            <Button type={'editInfo'} />
          </div>
          <div className={styles.box2}>
            <div>
              <h3>Name:</h3>
              <span>{postulant.name}</span>
            </div>
            <div>
              <h3>Email:</h3>
              <span>{postulant.email}</span>
            </div>
            <div>
              <h3>Date of Birth:</h3>
              <span>{postulant.dateOfBirth}</span>
            </div>
            <div>
              <h3>Phone Number:</h3>
              <span>{postulant.phoneNumber}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{postulant.address}</span>
            </div>
            <div>
              <h3>City:</h3>
              <span>{postulant.city}</span>
            </div>
          </div>
          <div className={styles.box3}>
            <div>
              <h3>City:</h3>
              <span>{postulant.city}</span>
            </div>
            <div>
              <h3>Age:</h3>
              <span>{postulant.dateOfBirth ? getAge(postulant.dateOfBirth) : ''}</span>
            </div>
            <div>
              <h3>Postal Code:</h3>
              <span>{postulant.zipCode}</span>
            </div>
          </div>
        </div>
        <div>
          <h4>About:</h4>
          <span>{postulant.description}</span>
        </div>
        <div>
          <h4>Interview:</h4>
          <span>
            {interview.dateTime}+{interview.time}
          </span>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default ChangeInterviewed;
