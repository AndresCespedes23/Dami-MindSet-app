import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessions, addSessions, deleteSessions, updateSessions } from 'redux/Sessions/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Sessions/actions';
import styles from './sessions.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

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
      <div className={styles.containerClients}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
            <h2>Sessions</h2>
            {showMessage && (
              <Message type={messageType} message={message} showMessage={handleShowMessage} />
            )}
          </div>
          <div className={styles.headerContent}>
            <Button type={'addNew'} onClick={handleClickAdd} />
          </div>
        </div>
        <div className={styles.contentClients}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.clientsInfo}>
                <th className={styles.tableHead}>Psychologist</th>
                <th className={styles.tableHead}>Postulant</th>
                <th className={styles.tableHead}>Date</th>
                <th className={styles.tableHead}>Time</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => {
                return [
                  <tr key={session._id} className={styles.clientsInfo}>
                    <td className={styles.userName}>
                      {session.idPsychologist ? session.idPsychologist.name : ''}
                    </td>
                    <td className={styles.userName}>
                      {session.idCandidate ? session.idCandidate.name : ''}
                    </td>
                    <td className={styles.userName}>{session.date}</td>
                    <td className={styles.userName}>{session.time}</td>
                    <td className={styles.userName}>{session.status}</td>
                    <td>
                      <Button type="delete" onClick={() => handleClickDelete(session._id)} />
                      <Button type="update" onClick={() => handleClickUpdate(session._id)} />
                      <Button
                        type="info"
                        onClick={() => history.push(`/admin/session/${session._id}`)}
                      />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </div>
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
