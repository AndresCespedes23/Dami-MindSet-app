import { useState, useEffect } from 'react';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import styles from './psychologists.module.css';
import Spinner from '../Shared/Spinner';

function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getPsychologists = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPsychologists(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  useEffect(() => {
    getPsychologists();
  }, []);

  const handleClickDelete = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, {
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
        getPsychologists();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Psychologist deleted');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error deleting psychologist');
      });
  };

  const handleClickUpdate = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('psychologists');
  };

  const handleUpdatePsychologist = (psychologist) => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(psychologist)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        getPsychologists();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Psychologist updated');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating psychologist');
      });
  };

  const handleClickAdd = () => {
    cleanMessage();
    setShowModal(true);
    setModalType('psychologists');
    setIdActive('');
  };

  const handleAddPsychologist = (psychologist) => {
    fetch(`${process.env.REACT_APP_API}/psychologists`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(psychologist)
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
        getPsychologists();
        setShowMessage(true);
        setMessageType('success');
        setMessage('Psychologist added');
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error adding psychologist');
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
          <h2>Psychologists</h2>
          <Button type="addNew" text={'PSYCHOLOGIST'} onClick={handleClickAdd} />
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone number</th>
              <th>Enrollment Number</th>
              <th>Time range</th>
              <th>Day range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.map((psychologist) => {
              return [
                <tr key={psychologist._id}>
                  <td>{psychologist.name}</td>
                  <td>{psychologist.email}</td>
                  <td>{psychologist.username}</td>
                  <td>{psychologist.phoneNumber}</td>
                  <td>{psychologist.enrollmentNumber}</td>
                  <td>{psychologist.timeRange[0] + ' to ' + psychologist.timeRange[1]}</td>
                  <td>{psychologist.dayRange[0] + ' to ' + psychologist.dayRange[1]}</td>
                  <td>{String(psychologist.status)}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(psychologist._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(psychologist._id)} />
                  </td>
                </tr>
              ];
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
              : modalType === 'psychologists' && !idActive
              ? handleAddPsychologist
              : handleUpdatePsychologist
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Psychologists;
