import { useState, useEffect } from 'react';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
/* import Message from '../Shared/Message'; */
//REPO JULI 27/11 18hs

function Applications() {
  const [applications, setApplications] = useState([]); //esto es para el fetch
  const [showModal, setShowModal] = useState(false); // modal
  const [modalType, setModalType] = useState(''); // modal para las acciones
  const [idActive, setIdActive] = useState(''); // esto esta para las acciones que no sean ADD

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API}/applications`)
    fetch('http://localhost:4000/api/applications')
      .then((response) => response.json())
      .then((response) => {
        setApplications(response);
      });
  }, []);

  const handleShowModal = () => {
    setShowModal(false); // para que el modal este desactivado por defecto
  };

  // ADD
  const handleClickAdd = () => {
    setShowModal(true); //abre el modal al tocar el botton add
    setModalType('applications');
    setIdActive('');
  };

  const handleAddApplication = (application) => {
    fetch('http://localhost:4000/api/applications', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json' // ¿POR QUÉ VA A APPLICATION?
      },
      body: JSON.stringify(application)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response); //ACÁ AGREGAN UN IF
        setApplications([...applications, response]);
      })
      .catch((err) => {
        console.log(err); //falta codigo -------------------------------------------------
      });
  };

  // DELETE
  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/applications/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' //¿PARA QUE SIRVE ESTO?
      }
    })
      .then((response) => response.json())
      .then(() => {
        setApplications(applications.filter((application) => application._id !== id));
      });
  };

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Position</th>
              <th>ID Candidate</th>
              <th>ID Interview</th>
              <th>Result</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return [
                <tr key={application._id}>
                  <td>{application.idPosition}</td>
                  <td>{application.idCandidate}</td>
                  <td>{application.idInterview}</td>
                  <td>{application.result}</td>
                  <td>{application.dateTime}</td>
                  <td>{application.status}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(application._id)} />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" onClick={handleClickAdd} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal} //hasta acá es para que el modal aparezca basicamente
          modalType={modalType} //esto sería para manejar las acciones
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'applications' && !idActive
              ? handleAddApplication
              : handleAddApplication //esto se que no iria, creo
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Applications;
