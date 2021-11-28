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
      .then((response) => response.json())
      .then(() => {
        setAdmins(admins.filter((admin) => admin._id !== id));
      });
  };

  const handleUpdateAdmin = (admin) => {
    console.log(admin);
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setModalType('admins');
    setIdActive('');
  };

  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('admins');
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
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.errors || response.code) return;
        setAdmins([...admins, response]);
      })
      .catch((err) => {
        console.log(err);
      });
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
