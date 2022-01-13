import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingInterview } from 'redux/Interviews/thunks';
import { getOnePostulant } from 'redux/Postulants/thunks';
import styles from './homeLogged.module.css';
import { useHistory } from 'react-router-dom';

function HomeLogged() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
    dispatch(getPendingInterview(sessionStorage.getItem('id')));
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <div className={styles.containerNav}>
          <h2 className={styles.title}>Welcome back, {postulant.name}!</h2>
        </div>
        <div className={styles.containerBody}>
          <h3 className={styles.subtitle}>Upcoming interviews:</h3>
          {interviews.length === 0 ? (
            <h3 className={styles.notFoundMessage}>Interviews not found</h3>
          ) : (
            <table className={styles.table}>
              <tbody>
                {interviews.map((interview) => {
                  return (
                    <tr className={styles.trTable} key={interview._id}>
                      <td className={styles.tableColumn}>
                        <span className={styles.mainInfo}>
                          {interview.idClient.name} - {interview.idPosition.name}
                        </span>
                        <span className={styles.subInfo}>{interview.dateTime}</span>
                      </td>
                      <td className={styles.tdDetails}>
                        <button
                          onClick={() => history.push(`/postulants/interview/${interview._id}`)}
                          className={styles.btnDetails}
                        >
                          VIEW DETAILS
                        </button>
                      </td>
                      <td className={styles.tdCancel}>
                        <button className={styles.btnCancel}>CANCEL</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className={styles.containerFooter}>
            <button className={styles.btnAvailability}>CHANGE AVAILABILITY</button>
            <button
              className={styles.btnInterviews}
              onClick={() => history.push(`/postulants/completed-interviews`)}
            >
              SEE COMPLETED INTERVIEWS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLogged;
