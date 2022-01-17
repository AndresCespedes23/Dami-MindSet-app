import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingInterview } from 'redux/Interviews/thunks';
import { getOnePostulant, updatePostulant } from 'redux/Postulants/thunks';
import styles from './homeLogged.module.css';
import { useHistory } from 'react-router-dom';
import Modal from 'Components/Postulant/Profile/Modal';
import { setModalType, setShowModal } from 'redux/Positions/actions';
import { getPostulantSessions } from 'redux/Sessions/thunks';

function HomeLogged() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.interviews.isLoading);
  const isLoadingSession = useSelector((store) => store.sessions.isLoading);
  const sessions = useSelector((store) => store.sessions.list);
  const showModal = useSelector((state) => state.postulants.showModal);
  const modalType = useSelector((state) => state.postulants.modalType);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
    dispatch(getPendingInterview(sessionStorage.getItem('id')));
    dispatch(getPostulantSessions(sessionStorage.getItem('id')));
  }, [dispatch]);

  const handleClickUpdateAvailability = () => {
    dispatch(setModalType('availability'));
    dispatch(setShowModal(true));
  };
  const handleUpdateAvailability = (postulant) => {
    dispatch(updatePostulant(postulant, sessionStorage.getItem('id'))).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };
  if (isLoading || isLoadingSession)
    return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
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
          <h3 className={styles.subtitle}>Psychologist Session:</h3>
          {interviews.length === 0 ? (
            <h3 className={styles.notFoundMessage}>Session not found</h3>
          ) : (
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTable}>
                  <td className={styles.tableColumn}>
                    <span className={styles.mainInfo}>
                      {sessions[0].idPsychologist.name} - {sessions[0].idPsychologist.email}
                    </span>
                    <span className={styles.subInfo}>
                      {sessions[0].date} - {sessions[0].time}
                    </span>
                  </td>
                  <td className={styles.tdDetails}>
                    <button
                      onClick={() => history.push(`/postulants/session/${sessions[0]._id}`)}
                      className={styles.btnDetails}
                    >
                      VIEW DETAILS
                    </button>
                  </td>
                  <td className={styles.tdCancel}>
                    {sessions[0].status === 'PENDING' ? (
                      <button className={styles.btnCancel}>CANCEL</button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <div className={styles.containerFooter}>
            <button
              className={styles.btnAvailability}
              onClick={() => handleClickUpdateAvailability(postulant._id)}
            >
              CHANGE AVAILABILITY
            </button>
            <button
              className={styles.btnInterviews}
              onClick={() => history.push(`/postulants/completed-interviews`)}
            >
              SEE COMPLETED INTERVIEWS
            </button>
            <button
              className={styles.btnInterviews}
              onClick={() => history.push(`/postulants/sessions`)}
            >
              Make an appointment to see one of our psychologist!
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={handleUpdateAvailability}
          meta={sessionStorage.getItem('id')}
        />
      )}
    </section>
  );
}

export default HomeLogged;
