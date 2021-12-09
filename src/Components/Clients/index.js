import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, addClient, deleteClient, updateClient } from '../../redux/Clients/thunks';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import Button from '../../Components/Shared/Button';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Clients() {
  const clients = useSelector((store) => store.clients.list);
  const isLoading = useSelector((store) => store.clients.isLoading);
  const messageType = useSelector((store) => store.clients.messageType);
  const message = useSelector((store) => store.clients.messageText);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    dispatch(deleteClient(id)).then(() => {
      setShowMessage(true);
      dispatch(getClients());
    });
  };

  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('clients');
  };

  const handleUpdateClients = (client) => {
    dispatch(updateClient(client)).then(() => {
      setShowMessage(true);
      dispatch(getClients());
    });
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('clients');
    setIdActive('');
  };

  const handleAddClients = (client) => {
    dispatch(addClient(client)).then(() => {
      setShowMessage(true);
      dispatch(getClients());
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
          <h2>Clients</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'CLIENT'} onClick={handleClickAdd} />
        </div>
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
      </div>
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
