import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
  getDisabledClients,
  searchClient
} from 'redux/Clients/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Clients/actions';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import styles from './clients-state.module.css';
import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';

function clientsStates() {
  const showModal = useSelector((store) => store.clients.showModal);
  const showMessage = useSelector((store) => store.clients.showMessage);
  const modalType = useSelector((store) => store.clients.modalType);
  const messageType = useSelector((store) => store.clients.messageType);
  const message = useSelector((store) => store.clients.messageText);
  const clients = useSelector((state) => state.clients.list);
  const disabledClients = useSelector((state) => state.clients.listDisabled);
  const isLoading = useSelector((state) => state.clients.isLoading);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getClients());
    dispatch(getDisabledClients());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      dispatch(searchClient(inputSearch));
      setIsSearch(true);
    }
  };
  const handleSubmit = () => {
    dispatch(searchClient(inputSearch));
    setIsSearch(true);
  };

  /*const handleDetails = (id, client) => {
    setIdActive(id);
    dispatch(updateClient(client, idActive)).then(() => {
      dispatch(getClients());
    });
  };*/

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
            <input
              className={styles.searchInput}
              placeholder="Clients"
              value={inputSearch}
              onChange={handleChange}
              onKeyPress={handleEnter}
            ></input>
            <Button type={'search'} onClick={handleSubmit} />
          </div>
        </div>
        <div>
          {!isSearch ? (
            <></>
          ) : isLoading ? (
            <Spinner type="ThreeDots" color="#002147" height={80} width={80} />
          ) : clients.length ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Cuit</th>
                  <th>Address</th>
                  <th>Activity</th>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.notFoundMessage}>Postulants not found</h3>
          )}
        </div>
        <div className={styles.contentClients}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Active Clients</span>
          </h3>
          <table>
            <tbody>
              {clients.map((client) => {
                if (client.isDeleted === false) {
                  return [
                    <tr key={client._id} className={styles.clientsInfo}>
                      <td className={styles.userName}>{client.name}</td>
                      <td>
                        <button className={styles.redBtn}>UNENABLE</button>
                        <button className={styles.redBtn}>DETAILS</button>
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
              {disabledClients.map((client) => {
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
                              ...client,
                              isDeleted: true
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
