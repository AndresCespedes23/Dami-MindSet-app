import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions, addSessions, deleteSessions, updateSessions } from 'redux/Sessions/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Sessions/actions';
import styles from './sessions.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';

function Sessions() {
  const [idActive, setIdActive] = useState('');
  const sessions = useSelector((state) => state.sessions.list);
  const isLoading = useSelector((state) => state.sessions.isLoading);
  const showMessage = useSelector((state) => state.sessions.showMessage);
  const message = useSelector((state) => state.sessions.messageText);
  const messageType = useSelector((state) => state.sessions.messageType);
  const showModal = useSelector((state) => state.sessions.showModal);
  const modalType = useSelector((state) => state.sessions.modalType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deleteSessions(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getSessions());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('sessions'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdateSession = (session) => {
    dispatch(updateSessions(session, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getSessions());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('sessions'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddSession = (session) => {
    dispatch(addSessions(session)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getSessions());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div>
          <h2>Sessions</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'SESSION'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Psychologist</th>
              <th>Postulant</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              return (
                <tr key={session._id}>
                  <td>{session.idPsychologist ? session.idPsychologist.name : ''}</td>
                  <td>{session.idCandidate ? session.idCandidate.name : ''}</td>
                  <td>{session.date}</td>
                  <td>{session.time}</td>
                  <td>{session.status}</td>
                  <td>{session.result}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(session._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(session._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'sessions' && !idActive
              ? handleAddSession
              : handleUpdateSession
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Sessions;
