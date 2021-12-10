import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, addClient, deleteClient, updateClient } from '../../redux/Clients/thunks';
import {
  setShowModal,
  setShowMessage,
  setModalType,
  setModalTitle
} from '../../redux/Clients/actions';
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
  const showModal = useSelector((store) => store.clients.showModal);
  const showMessage = useSelector((store) => store.clients.showMessage);
  const modalType = useSelector((store) => store.clients.modalType);
  const dispatch = useDispatch();
  const [idActive, setIdActive] = useState('');
  const modalTitle = useSelector((store) => store.clients.modalTitle);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deleteClient(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getClients());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('clients'));
    dispatch(setModalTitle('Update Client'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdateClients = (client) => {
    dispatch(updateClient(client, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getClients());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('clients'));
    dispatch(setModalTitle('Add Client'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddClients = (client) => {
    dispatch(addClient(client)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getClients());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
    dispatch(setModalTitle(''));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
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
          modalTitle={modalTitle}
        />
      )}
    </section>
  );
}
export default Clients;
