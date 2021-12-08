import { useState, useEffect } from 'react';
import styles from './interviews.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getInterviews = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  useEffect(() => {
    getInterviews();
  }, []);

  const handleDeleteClick = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDeleteInterview = (id) => {
    fetch(`${process.env.REACT_APP_API}/interviews/${id}`, {
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
        getInterviews();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Interview deleted');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error deleting interview');
      });
  };

  const handleUpdateClick = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('interviews');
  };

  const handleUpdateInterview = (interview) => {
    fetch(`${process.env.REACT_APP_API}/interviews/${idActive}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        getInterviews();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Interview updated');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating interview');
      });
  };

  const handleClickAdd = () => {
    cleanMessage();
    setShowModal(true);
    setIdActive(null);
    setModalType('interviews');
  };

  const handleAddInterview = (interview) => {
    fetch(`${process.env.REACT_APP_API}/interviews`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
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
        getInterviews();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Interview added');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error adding interview');
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
          <h2>Interviews</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'INTERVIEW'} onClick={handleClickAdd} />
        </div>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Client</th>
                <th>Position</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => {
                if (interview.idCandidate && interview.idClient && interview.idPosition) {
                  return [
                    <tr key={interview._id}>
                      <td>{interview.idCandidate.name}</td>
                      <td>{interview.idClient.name}</td>
                      <td>{interview.idPosition.name}</td>
                      <td>{interview.dateTime.split('T')[0]}</td>
                      <td className={styles[interview.status.toLowerCase()]}>
                        {interview.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                      </td>
                      <td>
                        <Button type="delete" onClick={() => handleDeleteClick(interview._id)} />
                        <Button type="update" onClick={() => handleUpdateClick(interview._id)} />
                      </td>
                    </tr>
                  ];
                }
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
              ? () => handleDeleteInterview(idActive)
              : modalType === 'interviews' && !idActive
              ? handleAddInterview
              : handleUpdateInterview
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Interviews;
