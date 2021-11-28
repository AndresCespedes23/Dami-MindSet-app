import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import Button from '../../Components/Shared/Button';
import Message from '../Shared/Message';

function Clients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response);
      });
  }, []);

  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        setClients(clients.filter((client) => client._id !== id));
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  const handleUpdateClients = (client) => {
    console.log(client);
    fetch(`http://localhost:4000/api/clients/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(client)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setShowMessage(true);
        setMessageType('success');
        setClients(clients.map((client) => (client._id === idActive ? response : client)));
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
    setModalType('clients');
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('clients');
    setIdActive('');
  };

  const handleAddClients = (client) => {
    fetch(`http://localhost:4000/api/clients`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.errors || response.code) {
          setShowMessage(true);
          setMessageType('error');
          return;
        }
        setShowMessage(true);
        setMessageType('success');
        setClients([...clients, response]);
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
      <h2>Clients</h2>
      {showMessage && (
        <Message
          type={messageType}
          message={messageType === 'success' ? 'Action Complete' : 'Error'}
          showMessage={handleShowMessage}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Cuit</th>
            <th>Address</th>
            <th>Activity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.cuit}</td>
                <td>{client.address}</td>
                <td>{client.activity}</td>
                <td>
                  <Button type="delete" onClick={() => handleClickDelete(client._id)} />
                  <Button type="update" onClick={() => handleClickUpdate(client._id)} />
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
              : modalType === 'clients' && !idActive
              ? handleAddClients
              : handleUpdateClients
          }
          meta={idActive}
        />
      )}
    </section>
  );
}
export default Clients;
