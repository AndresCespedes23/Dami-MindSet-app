import Spinner from 'Components/Shared/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPsychologists } from 'redux/Psychologists/thunks';
import { cleanAvailableSessions } from 'redux/Sessions/actions';
import { addSessions, getAvailableSessions } from 'redux/Sessions/thunks';
import styles from './sessions.module.css';

function Sessions() {
  const psychologists = useSelector((store) => store.psychologists.list);
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  //   const isLoadingSessions = useSelector((store) => store.sessions.isLoading);
  const sessions = useSelector((store) => store.sessions.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const [idPsychologist, setIdPsychologist] = useState('');

  useEffect(() => {
    dispatch(getPsychologists());
    dispatch(cleanAvailableSessions());
  }, [dispatch]);

  const getCombo = () => {
    let options = [];
    psychologists.map((psychologist) => {
      options.push({ value: psychologist._id, text: psychologist.name });
    });

    return options;
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setIdPsychologist(value);
    dispatch(getAvailableSessions(value));
  };

  const makeAppointment = (date) => {
    dispatch(
      addSessions({
        date: date.split('T')[0],
        time: `${date.split('T')[1].split(':')[0]}:${
          date.split('T')[1].split(':')[1].split(':')[0]
        }`,
        status: 'PENDING',
        result: [],
        idPsychologist: idPsychologist,
        idCandidate: sessionStorage.getItem('id')
      })
    );
    history.push('/postulants/home');
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <div className={styles.containerNav}>
          <h2 className={styles.title}>Make an appointment with one of our psychologists!</h2>
        </div>
        <div className={styles.containerBody}>
          <h3 className={styles.subtitle}>Psychologists:</h3>
          {psychologists.length === 0 ? (
            <h3 className={styles.notFoundMessage}>Psychologists not found</h3>
          ) : (
            <select value={idPsychologist} onChange={handleChange}>
              <option value={''} disabled>
                Select one
              </option>
              {getCombo().map((option) => (
                <option value={option.value} key={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.containerBody}>
          {idPsychologist === '' ? (
            <></>
          ) : sessions.length === 0 ? (
            <h3 className={styles.notFoundMessage}>
              Psychologist does not have sessions available
            </h3>
          ) : (
            <div>
              <h3 className={styles.subtitle}>Sessions:</h3>
              <table className={styles.table}>
                <tbody>
                  {sessions.map((session) => {
                    return (
                      <tr className={styles.trTable} key={session}>
                        <td className={styles.tableColumn}>
                          <span className={styles.mainInfo}>
                            {session?.split('T')[0]} {session?.split('T')[1].split(':')[0]}:
                            {session?.split('T')[1].split(':')[1].split(':')[0]}hs.
                          </span>
                        </td>
                        <td className={styles.tdDetails}>
                          <button className={styles.btnDetails}>
                            <span
                              className={styles.textCenter}
                              onClick={() => makeAppointment(session)}
                            >
                              MAKE APPOINTMENT
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Sessions;
