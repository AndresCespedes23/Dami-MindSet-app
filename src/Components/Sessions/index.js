import { useState, useEffect } from 'react';
import styles from './sessions.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  // GET All Sessions
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setSessions(response);
      });
  }, []);

  // ADD Button
  const handleClickAdd = () => {
    setShowModal(true);
    setIdActive('');
    setModalType('sessions');
  };

  // CREATE Session
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
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session added');
        setSessions([...sessions, response]);
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // DELETE Button
  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  // DELETE Session
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
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session deleted');
        setSessions(sessions.filter((session) => session._id !== id));
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // EDIT Button
  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('sessions');
  };

  // PUT Session
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
      .then((response) => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Session updated');
        setSessions(sessions.map((session) => (session._id === idActive ? response : session)));
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };

  return (
    <section className={styles.container}>
      <h2>Sessions</h2>
      {showMessage && (
        <Message type={messageType} message={message} showMessage={handleShowMessage} />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Psychologist</th>
            <th>Postulant</th>
            <th>Date Time</th>
            <th>Status</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            return (
              <tr key={session._id}>
                <td>{session.idPsychologist}</td>
                <td>{session.idCandidate}</td>
                <td>{session.dateTime}</td>
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
      <Button type="add" onClick={handleClickAdd} />
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
