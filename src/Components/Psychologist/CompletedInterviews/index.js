import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions } from 'redux/Sessions/thunks';
import styles from './completed-interviews.module.css';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import Button from 'Components/Shared/Button';

function CompletedInterviews() {
  const sessions = useSelector((state) => state.sessions.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <Button type={'backBtnPsycho'} onClick={() => history.back()} />
        <div className={styles.interviewsContent}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Unassigned users:</span>
          </h3>
          <table>
            <tbody>
              {sessions.map((session) => {
                if (session.status === 'PENDING') {
                  return [
                    <tr key={session._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{session.idCandidate.name}</td>
                      <div>
                        <td className={styles.date}>{session.date}</td>
                        <td className={styles.time}>
                          {session.time}
                          {session.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                        </td>
                      </div>
                      <td>
                        <button className={styles.assignBtn}>ASSIGN PROFILE</button>
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.interviewsContent}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Completed Interviews:</span>
          </h3>
          <table>
            <tbody>
              {sessions.map((session) => {
                if (session.status === 'DONE') {
                  return [
                    <tr key={session._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{session.idCandidate.name}</td>
                      <div>
                        <td className={styles.date}>{session.date}</td>
                        <td className={styles.time}>
                          {session.time}
                          {session.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                        </td>
                      </div>
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
    </section>
  );
}

export default CompletedInterviews;
