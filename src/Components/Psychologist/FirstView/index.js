import { useEffect } from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews } from 'redux/Interviews/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import styles from './first-view.module.css';

function FirstView() {
  const postulants = useSelector((state) => state.postulants.list);
  const interviews = useSelector((state) => state.interviews.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews());
    dispatch(getPostulants());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.containerPostulants}>
        <button className={styles.backBtn}>BACK</button>
        <div className={styles.content}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Unassigned users:</span>
          </h3>
          <table>
            <tbody>
              {postulants.map((postulant) => {
                if (postulant.status === 'PENDING INTERVIEW') {
                  return [
                    <tr key={postulant._id} className={styles.Info}>
                      <td className={styles.userName}>{postulant.name}</td>
                      <td className={styles[postulant.status.toLowerCase()]}>
                        {postulant.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
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
        <div className={styles.content}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Upcoming Interviews:</span>
          </h3>
          <table>
            <tbody>
              {interviews.map((interview) => {
                if (interview.status === 'PENDING') {
                  return [
                    <tr key={interview._id} className={styles.Info}>
                      <td className={styles.userName}>{interview.idCandidate.name}</td>
                      <td className={styles.dates}>{interview.dateTime.split('T')[0]}</td>
                      <td>
                        <button className={styles.rescheduleBtn}>RESCHEDULE</button>
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

export default FirstView;
