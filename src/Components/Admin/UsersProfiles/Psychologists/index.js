import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePsychologist } from 'redux/Psychologists/thunks';
import Button from 'Components/Shared/Button';
import styles from './psychologists.module.css';
import { getSessions } from 'redux/Sessions/thunks';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

function PsychologistsProfile() {
  const psychologist = useSelector((state) => state.psychologists.psychologist);
  const sessions = useSelector((state) => state.sessions.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePsychologist('61af8e2ffc13ae5ecc000514'));
    dispatch(getSessions());
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div>
            <Button type={'back'} />
          </div>
          <div className={styles.headercolumn}>
            <h2 className={styles.profileTitle}>Profile</h2>
            <span className={styles.psychoTitle}>Psychologists</span>
          </div>
        </div>
        <div className={styles.statusBox}>
          <span>Status</span>
          <p
            className={
              psychologist.status === 'ACTIVE'
                ? styles.statusActive
                : psychologist.status === 'INACTIVE'
                ? styles.statusInactive
                : styles.statusPending
            }
          >
            {psychologist.status}
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.info}>
            <div className={styles.infoColumn}>
              <div>
                <h4 className={styles.infoType}>Name:</h4>
                <span>{psychologist.name}</span>
              </div>
              <div>
                <h4 className={styles.infoType}>Username:</h4>
                <span>{psychologist.username}</span>
              </div>
              <div>
                <h4 className={styles.infoType}>Email:</h4>
                <span>{psychologist.email}</span>
              </div>
            </div>
            <div className={styles.infoColumn}>
              <div>
                <h4 className={styles.infoType}>Phone number:</h4>
                <span>{psychologist.phoneNumber}</span>
              </div>
              <div>
                <h4 className={styles.infoType}>Enrollment:</h4>
                <span>{psychologist.enrollmentNumber}</span>
              </div>
            </div>
          </div>
          <div className={styles.interviewsContent}>
            <h3 className={styles.title}>
              <span className={styles.bold}>Last Interviews:</span>
            </h3>
            <table>
              <tbody>
                {sessions.map((session) => {
                  if (session.status === 'DONE') {
                    return [
                      <tr key={session._id} className={styles.interviewsInfo}>
                        <td className={styles.userName}>{session.idCandidate.name}</td>
                        <td className={styles.dates}>{session.date}</td>
                        <td className={styles.time}>
                          {session.time}
                          {session.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                        </td>
                        <td>
                          <button className={styles.detailsBtn}>DETAILS</button>
                        </td>
                      </tr>
                    ];
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PsychologistsProfile;
