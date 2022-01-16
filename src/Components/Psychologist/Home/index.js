import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions } from 'redux/Sessions/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import styles from './home.module.css';
import { useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';

function Home() {
  const postulants = useSelector((state) => state.postulants.list);
  const sessions = useSelector((state) => state.sessions.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSessions());
    dispatch(getPostulants());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <div className={styles.containerPostulants}>
        <Button type={'backBtnPsycho'} onClick={() => history.push('/psychologist')} />
        <div className={styles.content}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Unassigned users:</span>
          </h3>
          <table>
            <tbody>
              {postulants.map((postulant) => {
                if (postulant.status === 'PENDING INTERVIEW') {
                  return (
                    <tr key={postulant._id} className={styles.Info}>
                      <td className={styles.userName}>{postulant.name}</td>
                      <td>
                        <button
                          onClick={() => history.push(`/psychologist/postulant/${postulant._id}`)}
                          className={styles.assignBtn}
                        >
                          SEE PROFILE
                        </button>
                      </td>
                    </tr>
                  );
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
              {sessions.map((session) => {
                if (session.status === 'PENDING') {
                  return (
                    <tr key={session._id} className={styles.Info}>
                      <td className={styles.userName}>{session.idCandidate.name}</td>
                      <span>
                        <td className={styles.dates}>{session.date.split('T')[0]}</td>
                        <td className={styles.dates}>{session.time}</td>
                      </span>
                      <td>
                        <button className={styles.rescheduleBtn}>RESCHEDULE</button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.bottomBtns}>
          <button
            onClick={() => history.push('/psychologist/availability')}
            className={styles.availabilityBtn}
          >
            CHANGE AVAILABILITY
          </button>
          <button
            onClick={() => history.push('/psychologist/postulants/search')}
            className={styles.searchBtn}
          >
            SEARCH USER
          </button>
          <button
            onClick={() => history.push('/psychologist/completed-interviews')}
            className={styles.backBtn}
          >
            SEE COMPLETED INTERVIEWS
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
