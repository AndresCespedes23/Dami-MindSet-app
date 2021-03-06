import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getClients,
  addClient,
  getDisabledClients,
  searchClient,
  deleteClient,
  activateClient
} from 'redux/Clients/thunks';
import {
  setShowModal,
  setShowMessage,
  setModalType,
  cleanSelectedClients
} from 'redux/Clients/actions';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import styles from './clients-state.module.css';
import Button from 'Components/Shared/Button';
// import Spinner from 'Components/Shared/Spinner';
import { useHistory } from 'react-router-dom';

function clientsStates() {
  const showModal = useSelector((store) => store.clients.showModal);
  const showMessage = useSelector((store) => store.clients.showMessage);
  const modalType = useSelector((store) => store.clients.modalType);
  const messageType = useSelector((store) => store.clients.messageType);
  const message = useSelector((store) => store.clients.messageText);
  const clients = useSelector((state) => state.clients.list);
  const disabledClients = useSelector((state) => state.clients.listDisabled);
  // const isLoading = useSelector((state) => state.clients.isLoading);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  // const [isSearch, setIsSearch] = useState(false);
  const [idActive, setIdActive] = useState('');
  const history = useHistory();

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
      // setIsSearch(true);
    }
  };
  const handleSubmit = () => {
    dispatch(searchClient(inputSearch));
    // setIsSearch(true);
  };

  const handleDisable = (id) => {
    dispatch(deleteClient(id)).then(() => {
      dispatch(getClients());
      dispatch(getDisabledClients());
    });
  };
  const handleEnable = (id) => {
    dispatch(activateClient(id)).then(() => {
      dispatch(getClients());
      dispatch(getDisabledClients());
    });
  };
  const handleClickAdd = () => {
    dispatch(setModalType('clients'));
    dispatch(cleanSelectedClients());
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
            <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
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
          <div className={styles.searchContainer}>
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
                        <button className={styles.redBtn} onClick={() => handleDisable(client._id)}>
                          DISABLE
                        </button>
                        <button
                          className={styles.blueBtn}
                          onClick={() => history.push(`/admin/client/${client._id}`)}
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
              {disabledClients.map((client) => {
                if (client.isDeleted === true) {
                  return [
                    <tr key={client._id} className={styles.clientsInfo}>
                      <td className={styles.userName}>{client.name}</td>
                      <td>
                        {/* <button
                          className={styles.redBtn}
                          onClick={() => handleDelete(idActive, client._id)}
                        >
                          DELETE
                        </button> */}
                        <button
                          className={styles.greenBtn}
                          onClick={() => handleEnable(client._id)}
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
