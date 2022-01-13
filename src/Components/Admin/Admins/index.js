import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, updateAdmins } from 'redux/Admins/thunks.js';
import { setShowModal, setShowMessage, setModalType } from 'redux/Positions/actions';
import styles from './admins.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';
import { FaEdit } from 'react-icons/fa';
import { getLoggedUser, registerNewUser } from 'redux/Auth/thunks';

function Admins() {
  const [idActive, setIdActive] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const showMessage = useSelector((state) => state.admins.showMessage);
  const message = useSelector((state) => state.admins.messageText);
  const messageType = useSelector((state) => state.admins.messageType);
  const showModal = useSelector((state) => state.admins.showModal);
  const modalType = useSelector((state) => state.admins.modalType);
  const isLoadingForm = useSelector((state) => state.admins.isLoadingForm);
  const dispatch = useDispatch();
  let loggedUser = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    dispatch(getLoggedUser(sessionStorage.getItem('id'), sessionStorage.getItem('userType')));
    dispatch(getAdmins());
  }, [dispatch]);

  const handleClickUpdate = (id) => {
    dispatch(setModalType('admins'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdateAdmin = (admin) => {
    dispatch(updateAdmins(admin, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getAdmins());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };
  const handleDissabled = (id, admin) => {
    setIdActive(id);
    dispatch(updateAdmins(admin, id)).then(() => {
      dispatch(getAdmins());
    });
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };
  const handleClickAdd = () => {
    dispatch(setModalType('admins'));
    setIdActive('');
    dispatch(setShowModal(true));
  };
  const handleAddAdmin = (admin) => {
    dispatch(registerNewUser(admin, 'ADMIN')).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getAdmins());
    });
  };

  if (isLoading || isLoadingForm)
    return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div>
          <h2>Admins</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          {!loggedUser.isSuperAdmin ? (
            <> </>
          ) : (
            <Button type="addNew" text={'ADMIN'} onClick={handleClickAdd} />
          )}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <h3 className={styles.title}>
            <span className={styles.bold}>Active Admins</span>
          </h3>
          <tbody>
            {admins.map((admin) => {
              if (admin.isDeleted === false) {
                return (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.username}</td>
                    <td>
                      {loggedUser.isSuperAdmin || loggedUser._id === admin._id ? (
                        <>
                          <button
                            className={styles.redBtn}
                            onClick={() => handleClickUpdate(admin._id)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={styles.redBtn}
                            onClick={() =>
                              handleDissabled(admin._id, {
                                ...admin,
                                isDeleted: true
                              })
                            }
                          >
                            DISSABLE
                          </button>
                        </>
                      ) : (
                        <> </>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
          <h3 className={styles.title}>
            <span className={styles.bold}>Disabled Admins</span>
          </h3>
          <tbody>
            {admins.map((admin) => {
              if (admin.isDeleted === true) {
                return (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.username}</td>
                    <td>
                      {loggedUser.isSuperAdmin || loggedUser._id === admin._id ? (
                        <button
                          className={styles.redBtn}
                          onClick={() =>
                            handleDissabled(admin._id, {
                              ...admin,
                              isDeleted: false
                            })
                          }
                        >
                          ENABLE
                        </button>
                      ) : (
                        <> </>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={modalType === 'admins' && !idActive ? handleAddAdmin : handleUpdateAdmin}
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Admins;
