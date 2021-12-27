import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews } from 'redux/Interviews/thunks';
import styles from './completed-interviews.module.css';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

function CompletedInterviews() {
  const interviews = useSelector((state) => state.interviews.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <button className={styles.backBtn}>BACK</button>
        <div className={styles.interviewsContent}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Unassigned users:</span>
          </h3>
          <table>
            <tbody>
              {interviews.map((interview) => {
                if (interview.status === 'PENDING') {
                  return [
                    <tr key={interview._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{interview.idCandidate.name}</td>
                      <td>{interview.dateTime.split('T')[0]}</td>
                      <td className={styles[interview.status.toLowerCase()]}>
                        {interview.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                      </td>
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
              {interviews.map((interview) => {
                if (interview.status === 'DONE') {
                  return [
                    <tr key={interview._id} className={styles.interviewsInfo}>
                      <td className={styles.userName}>{interview.idCandidate.name}</td>
                      <td>{interview.dateTime.split('T')[0]}</td>
                      <td className={styles[interview.status.toLowerCase()]}>
                        {interview.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
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
    </section>
  );
}

export default CompletedInterviews;
