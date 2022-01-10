// function Home() {
//   return (
//     <section>
//       <h1>Hello Home</h1>
//     </section>
//   );
// }

// export default Home;

import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingInterview } from 'redux/Interviews/thunks';
import { getOnePsychologist } from 'redux/Psychologists/thunks';
import styles from './home.module.css';
// import { useHistory } from 'react-router-dom';

function Home() {
  // const psychologist = useSelector((store) => store.psychologists.psychologist);
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  const dispatch = useDispatch();
  //   const history = useHistory();

  useEffect(() => {
    dispatch(getOnePsychologist(sessionStorage.getItem('id')));
    dispatch(getPendingInterview(sessionStorage.getItem('id')));
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <div className={styles.containerBody}>
          <h3 className={styles.subtitle}>Unassigned users:</h3>
          {interviews.length === 0 ? (
            <h3 className={styles.notFoundMessage}>Users not found</h3>
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
                        <button className={styles.btnDetails}>VIEW DETAILS</button>
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
                        <button className={styles.btnDetails}>VIEW DETAILS</button>
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
            <button className={styles.btnSearch}>SEARCH USER</button>
            <button className={styles.btnInterviews}>SEE COMPLETED INTERVIEWS</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
