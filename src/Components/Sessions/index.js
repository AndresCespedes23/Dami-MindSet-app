import { useState, useEffect } from 'react';
import styles from './sessions.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getSessions = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setSessions(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  useEffect(() => {
    getSessions();
  }, []);

  const handleClickDelete = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/sessions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        getSessions();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session deleted');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error deleting session');
      });
  };

  const handleClickUpdate = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('sessions');
  };

  const handleUpdateSession = (session) => {
    fetch(`${process.env.REACT_APP_API}/sessions/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(session)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        getSessions();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session updated');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating session');
      });
  };

  const handleClickAdd = () => {
    cleanMessage();
    setShowModal(true);
    setIdActive('');
    setModalType('sessions');
  };

  const handleAddSession = (session) => {
    fetch(`${process.env.REACT_APP_API}/sessions`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        if (response.errors || response.code) {
          setShowMessage(true);
          setMessageType('error');
          setMessage('Error with parameters');
          return;
        }
        getSessions();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session added');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error creating session');
      });
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
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
