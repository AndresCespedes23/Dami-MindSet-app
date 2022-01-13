import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedInterviews } from 'redux/Interviews/thunks';
import { getOnePostulant } from 'redux/Postulants/thunks';
import styles from './completedInterviews.module.css';
import { useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';

function HomeLogged() {
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
    dispatch(getCompletedInterviews(sessionStorage.getItem('id')));
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <div className={styles.header}>
          <div>
            <Button type={'back'} />
          </div>
        </div>
        <div className={styles.containerBody}>
          <h3 className={styles.subtitle}>Completed interviews:</h3>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeLogged;
