import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClients, addClient, updateClient, deleteClient } from 'redux/Clients/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Clients/actions';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import styles from './clients-state.module.css';
import Button from 'Components/Shared/Button';

function clientsStates() {
  const showModal = useSelector((store) => store.clients.showModal);
  const showMessage = useSelector((store) => store.clients.showMessage);
  const modalType = useSelector((store) => store.clients.modalType);
  const messageType = useSelector((store) => store.clients.messageType);
  const message = useSelector((store) => store.clients.messageText);
  const clients = useSelector((state) => state.clients.list);
  const dispatch = useDispatch();
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleDetails = (id, client) => {
    setIdActive(id);
    dispatch(updateClient(client, idActive)).then(() => {
      dispatch(getClients());
    });
  };

  const handleEnable = (id, client) => {
    setIdActive(id);
    dispatch(updateClient(client, idActive)).then(() => {
      dispatch(getClients());
    });
  };

  const handleDelete = (id, client) => {
    setIdActive(id);
    dispatch(deleteClient(client, idActive)).then(() => {
      dispatch(getClients());
    });
  };
  const handleClickAdd = () => {
    dispatch(setModalType('clients'));
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
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerClients}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Button type={'backBtnAdmin'} />
            <h2>Clients</h2>
            {showMessage && (
              <Message type={messageType} message={message} showMessage={handleShowMessage} />
            )}
          </div>
          <div className={styles.headerContent}>
            <Button type={'addNew'} onClick={handleClickAdd} />
          </div>
          {showModal && (
            <Modal
              handleShowModal={handleShowModal}
              modalType={modalType}
              handleSubmit={(modalType === 'clients', handleAddClients)}
              meta={idActive}
            />
          )}
        </div>
        <div className={styles.activeClients}>
          <div>
            <h3 className={styles.title}>
              <span className={styles.bold}>Active Clients</span>
            </h3>
          </div>
          <div>
            <input className={styles.searchInput} placeholder="Clients"></input>
            <Button type={'search'} />
          </div>
        </div>
        <div className={styles.contentClients}>
          <div className={styles.contentClients}></div>
          <table>
            <tbody>
              {clients.map((client) => {
                if (client.isDeleted === false) {
                  return [
                    <tr key={client._id} className={styles.clientsInfo}>
                      <td className={styles.userName}>{client.name}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() =>
                            handleDetails(client._id, {
                              ...clients
                            })
                          }
                        >
                          DETAILS
                        </button>
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.contentClients}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Disabled Clients</span>
          </h3>
          <table>
            <tbody>
              {clients.map((client) => {
                if (client.isDeleted === true) {
                  return [
                    <tr key={client._id} className={styles.clientsInfo}>
                      <td className={styles.userName}>{client.name}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() => handleDelete(idActive, client._id)}
                        >
                          DELETE
                        </button>
                        <button
                          className={styles.greenBtn}
                          onClick={() =>
                            handleEnable(client._id, {
                              ...client
                            })
                          }
                        >
                          ENABLE
                        </button>
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export default clientsStates;
