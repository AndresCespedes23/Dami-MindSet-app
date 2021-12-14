import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, updateAdmins } from '../../redux/Admins/thunks.js';
import { setShowModal, setShowMessage, setModalType } from '../../redux/Positions/actions';
import styles from './admins.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Admins() {
  const [idActive, setIdActive] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const showMessage = useSelector((state) => state.admins.showMessage);
  const message = useSelector((state) => state.admins.messageText);
  const messageType = useSelector((state) => state.admins.messageType);
  const showModal = useSelector((state) => state.admins.showModal);
  const modalType = useSelector((state) => state.admins.modalType);
  const dispatch = useDispatch();

  useEffect(() => {
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

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
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
                    <Button type="update" onClick={() => handleClickUpdate(admin._id)} />
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
          handleSubmit={handleUpdateAdmin}
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Admins;
