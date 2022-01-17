import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions } from 'redux/Sessions/thunks';
import styles from './completed-interviews.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

function CompletedInterviews() {
  const sessions = useSelector((state) => state.sessions.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <Button type={'backBtnPsycho'} onClick={() => history.push('/psychologist')} />
        <div className={styles.interviewsContent}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Pending interviews:</span>
          </h3>
          <table>
            <tbody>
              {sessions?.map((session) => {
                if (session.status === 'PENDING') {
                  return [
                    <tr key={session._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{session.idCandidate?.name}</td>
                      <div>
                        <td className={styles.date}>{session.date}</td>
                        <td className={styles.time}>{session.time}</td>
                      </div>
                      <td>
                        <button
                          className={styles.assignBtn}
                          onClick={() =>
                            history.push(`/psychologist/change-interviewed/${session._id}`)
                          }
                        >
                          ASSIGN PROFILE
                        </button>
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
              {sessions?.map((session) => {
                if (session.status === 'DONE') {
                  return [
                    <tr key={session._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{session?.idCandidate?.name}</td>
                      <div>
                        <td className={styles.date}>{session.date}</td>
                        <td className={styles.time}>{session.time}</td>
                      </div>
                      <td>
                        <button
                          className={styles.detailsBtn}
                          onClick={() =>
                            history.push(`/psychologist/change-interviewed/${session._id}`)
                          }
                        >
                          DETAILS
                        </button>
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
