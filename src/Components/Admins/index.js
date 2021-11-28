import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response);
      });
  }, []);

  const handleUpdateAdmin = (admin) => {
    console.log(admin);
  };

  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('admins');
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
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
