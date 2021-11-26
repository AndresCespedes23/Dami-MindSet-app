import { useState, useEffect } from 'react';
import styles from './postulants.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Form from './Form';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cambiar por variable de entorno
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        setPostulants(postulants.filter((postulant) => postulant._id !== id));
      });
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => {
            return (
              <tr key={postulant._id}>
                <td>{postulant.name}</td>
                <td>{postulant.email}</td>
                <td>{postulant.phoneNumber}</td>
                <td>{postulant.country}</td>
                <td>{postulant.status}</td>
                <td>
                  <Button type="delete" onClick={() => handleDelete(postulant._id)} />
                  <Button type="update" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button type="add" onClick={() => handleAdd()} />
      {showModal && <Modal handleShowModal={handleShowModal} component={<Form />} />}
    </section>
  );
}

export default Postulants;
