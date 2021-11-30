import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setAdmins(response);
      });
  }, []);

  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, {
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
        setMessage('Admin deleted');
        setAdmins(admins.filter((admin) => admin._id !== id));
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  const handleUpdateAdmin = (admin) => {
    fetch(`${process.env.REACT_APP_API}/admins/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(admin)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Admin updated');
        setAdmins(admins.map((admin) => (admin._id === idActive ? response : admin)));
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
    setModalType('admins');
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('admins');
    setIdActive('');
  };

  const handleAddAdmin = (admin) => {
    fetch(`${process.env.REACT_APP_API}/admins`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
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
        setMessage('Admin added');
        setAdmins([...admins, response]);
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
      <h2>Admins</h2>
      {showMessage && (
        <Message type={messageType} message={message} showMessage={handleShowMessage} />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.username}</td>
                <td>
                  <Button type="delete" onClick={() => handleClickDelete(admin._id)} />
                  <Button type="update" onClick={() => handleClickUpdate(admin._id)} />
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
              : modalType === 'admins' && !idActive
              ? handleAddAdmin
              : handleUpdateAdmin
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Admins;
