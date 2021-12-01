import { useState, useEffect } from 'react';
import styles from './postulants.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const getPostulants = () => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPostulants(response);
      });
  };

  useEffect(() => {
    getPostulants();
  }, []);

  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/candidates/${id}`, {
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
        setMessage('Candidate deleted');
        getPostulants();
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  const handleUpdatePostulant = (postulant) => {
    fetch(`${process.env.REACT_APP_API}/candidates/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(postulant)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Candidate updated');
        getPostulants();
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('postulants');
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('postulants');
    setIdActive('');
  };

  const handleAddPostulant = (postulant) => {
    fetch(`${process.env.REACT_APP_API}/candidates`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postulant)
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
        setMessage('Candidate added');
        getPostulants();
      })
      .catch((err) => {
        console.log(err);
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
      <h2>Postulants</h2>
      {showMessage && (
        <Message type={messageType} message={message} showMessage={handleShowMessage} />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => {
            return (
              <tr key={postulant._id}>
                <td>{postulant.name}</td>
                <td>{postulant.email}</td>
                <td>{postulant.phoneNumber}</td>
                <td>{postulant.country}</td>
                <td>{postulant.status}</td>
                <td>
                  <Button type="delete" onClick={() => handleClickDelete(postulant._id)} />
                  <Button type="update" onClick={() => handleClickUpdate(postulant._id)} />
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
              : modalType === 'postulants' && !idActive
              ? handleAddPostulant
              : handleUpdatePostulant
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Postulants;
