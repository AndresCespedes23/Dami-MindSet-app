import { useState, useEffect } from 'react';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Applications() {
  const [applications, setApplications] = useState([]); // this is for "fetch"
  const [showModal, setShowModal] = useState(false); // modal
  const [modalType, setModalType] = useState(''); // modal for add, update and delete
  const [idActive, setIdActive] = useState(''); // modal for update and delete
  const [showMessage, setShowMessage] = useState(false); // (true/false)
  const [messageType, setMessageType] = useState(''); // ('error'/'success')
  const [message, setMessage] = useState(''); // (string)
  const [isLoading, setLoading] = useState(false);

  const getApplications = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setApplications(response);
      })
      .catch((err) => {
        setMessageType('error');
        setMessage('Error:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getApplications();
  }, []);

  // ----------- ADD -----------
  const handleClickAdd = () => {
    setShowModal(true); // this is for open the modal
    setIdActive('');
    setModalType('applications');
  };

  const handleAddApplication = (application) => {
    fetch(`${process.env.REACT_APP_API}/applications`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
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
        setMessage('Application added');
        getApplications();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // ----------- DELETE -----------
  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
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
        setMessage('Application deleted');
        setApplications(applications.filter((application) => application._id !== id));
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // ----------- UPDATE(EDIT) -----------
  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('applications');
  };

  const handleUpdateApplication = (application) => {
    fetch(`${process.env.REACT_APP_API}/applications/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(application)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Application updated');
        setApplications(
          applications.map((application) => (application._id === idActive ? response : application))
        );
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // -----------MODAL AND MESSAGES-----------
  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      {showMessage && (
        <Message type={messageType} message={message} showMessage={handleShowMessage} />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Candidate</th>
            <th>Interview Date</th>
            <th>Result</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            return (
              <tr key={application._id}>
                <td>{application.idPosition ? application.idPosition.name : 'ID deleted'}</td>
                <td>{application.idCandidate ? application.idCandidate.name : 'ID deleted'}</td>
                <td>
                  {!application.idInterview
                    ? 'ID deleted'
                    : application.idInterview.dateTime
                    ? application.idInterview.dateTime.split('T')[0]
                    : '...loading...'}
                </td>
                <td>{application.result}</td>
                <td>{application.dateTime ? application.dateTime.split('T')[0] : ''}</td>
                <td>{application.status}</td>
                <td>
                  <Button type="update" onClick={() => handleClickUpdate(application._id)} />
                  <Button type="delete" onClick={() => handleClickDelete(application._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading === true ? <Spinner /> : null}
      <Button type="add" onClick={handleClickAdd} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal} // to show modal
          modalType={modalType} // this is for manage the actions
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'applications' && !idActive
              ? handleAddApplication
              : handleUpdateApplication
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Applications;
